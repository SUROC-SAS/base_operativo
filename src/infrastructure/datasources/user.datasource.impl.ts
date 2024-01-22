import User from "#/data/postgreSQL/models/user.model";
import Identification from "#/data/postgreSQL/models/identification.model";
import { Identifications, PersonTypes } from '#/infrastructure/interfaces';
import { sequelize } from "#/data/postgreSQL";
import { UserDataSource } from "#/domain";
import { CreateAssignedRoleDto, CreatePersonalInformationDto } from "#/domain/dtos";
import { CustomError } from "#/domain/errors/custom.error";
import { UserMapper } from "../mappers";
import { Transaction } from "sequelize";
import PersonType from "#/data/postgreSQL/models/person-type.model";
import PersonalInformation from "#/data/postgreSQL/models/personal-information.model";
import { PersonalInformationMapper } from "../mappers/user/personalInformation.mapper";
import { ICreateUserDtos } from "#/domain/interfaces";
import AssignedRole from "#/data/postgreSQL/models/assigned-role.model";
import Role from "#/data/postgreSQL/models/role.model";
import { AssignedRoleMapper } from "../mappers/user/assigned-role.mapper";

export class UserDataSourceImpl implements UserDataSource {
  async createUser({
    createUserDto,
    createPersonalInformationDto,
    createAssignedRoleDto,
  }: ICreateUserDtos) {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const userExit = await User.findOne({
        where: {
          email: createUserDto.email
        },
        transaction,
        lock: Transaction.LOCK.UPDATE,
      });

      if (userExit) {
        throw CustomError.badRequest('User with this email already exist');
      }

      const user = await User.create({
        email: createUserDto.email,
        active: createUserDto.active,
        password: createUserDto.password,
        lastAccess: createUserDto.lastAccess,
        emailValidate: createUserDto.emailValidate,
      }, { transaction });

      const personalInformation = await this.createPersonalInformation(createPersonalInformationDto, user.id, transaction);
      const assignedRoles = await this.createAssignedRoles(createAssignedRoleDto, user.id, transaction);
      const userMapper = UserMapper(user);
      userMapper.personalInformation = personalInformation;
      userMapper.assignedRoles = assignedRoles;

      await transaction.commit();
      return userMapper;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal();
    }
  }

  private async createPersonalInformation(createcreatePersonalInformationDto: CreatePersonalInformationDto, userId: number, transaction: Transaction) {
    const identification = await Identification.findByPk(createcreatePersonalInformationDto.identificationId, {
      transaction
    });

    if (!identification) {
      throw CustomError.notFound('Identification not found');
    }

    let error: string | null = null;
    const nit = Identifications.NIT === identification.code;
    const nitForeign = Identifications.NIT_PAIS === identification.code;
    if (nitForeign) {
      error = createcreatePersonalInformationDto.validateForeign();
    } else if (nit) {
      error = createcreatePersonalInformationDto.validateNit();
    } else {
      const personType = await PersonType.findOne({
        where: {
          code: PersonTypes.PERSONA_NATURAL
        },
        transaction,
      });

      if (!personType) {
        throw CustomError.notFound('Person type not found');
      }

      createcreatePersonalInformationDto.personTypeId = personType.id;
      error = createcreatePersonalInformationDto.validateNational();
    }

    if (error) {
      throw CustomError.badRequest(error);
    }

    if (nit) {
      const personType = await PersonType.findOne({
        where: {
          id: createcreatePersonalInformationDto.personTypeId,
        },
        transaction,
      });

      if (!personType) {
        throw CustomError.notFound('Person type not found');
      }
    }

    const personalInformationExist = await PersonalInformation.findOne({
      where: {
        documentNumber: createcreatePersonalInformationDto.documentNumber,
        identificationId: createcreatePersonalInformationDto.identificationId,
      },
      transaction,
      lock: Transaction.LOCK.UPDATE,
    });

    if (personalInformationExist) {
      throw CustomError.badRequest('User with this document number and identification already exist');
    }

    const personalInformation = await PersonalInformation.create({
      dv: createcreatePersonalInformationDto.dv,
      firstName: createcreatePersonalInformationDto.firstName,
      middleName: createcreatePersonalInformationDto.middleName,
      firstSurname: createcreatePersonalInformationDto.firstSurname,
      secondSurname: createcreatePersonalInformationDto.secondSurname,
      businessName: createcreatePersonalInformationDto.businessName,
      documentNumber: createcreatePersonalInformationDto.documentNumber,
      personTypeId: createcreatePersonalInformationDto.personTypeId,
      taxLiabilityId: createcreatePersonalInformationDto.taxLiabilityId,
      identificationId: createcreatePersonalInformationDto.identificationId,
      userId,
    }, { transaction });

    return PersonalInformationMapper(personalInformation);
  }

  private async createAssignedRoles(createAssignedRoleDto: CreateAssignedRoleDto, userId: number, transaction: Transaction) {
    const roles = await Role.findAll({
      where: { code: createAssignedRoleDto.roles },
      transaction
    });

    createAssignedRoleDto.roles.forEach(code => {
      const exist = roles.some(role => role.code === code);
      if (!exist) throw CustomError.badRequest(`Código ${code} no encontrado en roles.`);
    });

    const assignedRoles = await AssignedRole.bulkCreate(roles.map(role => ({ roleId: role.id, userId })), { transaction });

    return assignedRoles.map(assignedRole => AssignedRoleMapper(assignedRole));
  }
}