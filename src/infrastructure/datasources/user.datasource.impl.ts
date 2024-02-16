import User from '#/data/postgreSQL/models/user.model';
import Token from '#/data/postgreSQL/models/token.model';
import State from '#/data/postgreSQL/models/state.model';
import Country from '#/data/postgreSQL/models/country.model';
import Address from '#/data/postgreSQL/models/address.model';
import TokenType from '#/data/postgreSQL/models/token-type.model';
import PersonType from '#/data/postgreSQL/models/person-type.model';
import Municipality from '#/data/postgreSQL/models/municipality.model';
import Identification from '#/data/postgreSQL/models/identification.model';
import ContactInformation from '#/data/postgreSQL/models/contact-information.model';
import PersonalInformation from '#/data/postgreSQL/models/personal-information.model';
import { AssignRoleMapper, UserMapper } from '../mappers';
import { Op, Transaction } from 'sequelize';
import { UserDataSource } from '#/domain';
import { sequelize } from '#/data/postgreSQL';
import { CreateUserDtos, Email, Identifications } from '#/domain/interfaces';
import { CustomError } from '#/domain/errors/custom.error';
import { TokenMapper } from '../mappers/user/token.mapper';
import { AddressMapper } from '../mappers/user/address.mapper';
import { TimeAdapter, UbcryptAdapter, units } from '#/domain/interfaces';
import { CountriesCodes } from '../interfaces/user/countries.interfaces';
import { UuidAdapter } from '#/domain/interfaces/adapters/uuid.adapter.interface';
import { ContactInformationMapper } from '../mappers/user/contactInformation.mapper';
import { PersonalInformationMapper } from '../mappers/user/personalInformation.mapper';
import { PersonTypes, TokenTypeCodes } from '#/infrastructure/interfaces';
import {
  AssignRoleDto,
  CreateAddressDto,
  CreateContactInformationDto,
  CreatePersonalInformationDto,
  CreateTokenDto,
} from '#/domain/dtos';
import { AddressEntity, PersonalInformationEntity, UserEntity } from '#/domain/entities/user';
import Role from '#/data/postgreSQL/models/role.model';
import AssignedRole from '#/data/postgreSQL/models/assigned-role.model';

export class UserDataSourceImpl implements UserDataSource {
  constructor(
    private readonly emailService: Email,
    private readonly uidAdapter: UuidAdapter,
    private readonly momentAdapter: TimeAdapter,
    private readonly bcryptAdapter: UbcryptAdapter
  ) { }

  async createUser({
    createUserDto,
    assignRolesDto,
    createAddressDto,
    createContactInformationDto,
    createPersonalInformationDto,
  }: CreateUserDtos): Promise<UserEntity> {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const userExit = await User.findOne({
        where: {
          email: createUserDto.email,
        },
        transaction,
        lock: Transaction.LOCK.UPDATE,
      });

      if (userExit) {
        throw CustomError.badRequest('User with this email already exist');
      }

      const user = await User.create(
        {
          email: createUserDto.email,
          active: createUserDto.active,
          lastAccess: createUserDto.lastAccess,
          emailValidate: createUserDto.emailValidate,
          password: this.bcryptAdapter.encrypt(createUserDto.password, 10),
        },
        { transaction }
      );

      await user.update({ uid: `US${user.id + 1000}` }, { transaction });

      const personalInformation = await this.createPersonalInformation(createPersonalInformationDto, user.id, transaction);
      const contactInformation = await this.createContactInformation(createContactInformationDto, user.id, transaction);
      const address = await this.createAddress(createAddressDto, user.id, transaction);
      const token = await this.createToken(user.id, transaction);
      const assignRoles = await this.assignRoles(assignRolesDto, user.id, transaction);

      const userMapper = UserMapper(user);
      userMapper.token = [token];
      userMapper.address = address;
      userMapper.assignRoles = assignRoles;
      userMapper.personalInformation = personalInformation;
      userMapper.contactInformation = contactInformation;

      await this.sendWelcomeEmail(userMapper);
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

  private async sendWelcomeEmail(user: UserEntity) {
    const template = this.emailService.prepareHtml('welcome', {
      fullName: user.getFullName(),
      resetLink: this.emailService.resetLink(),
    });

    await this.emailService.sendEmail('Welcome to our platform', user.email, template);
  }

  private async createPersonalInformation(
    createPersonalInformationDto: CreatePersonalInformationDto,
    userId: number,
    transaction: Transaction
  ) {
    const identification = await Identification.findByPk(createPersonalInformationDto.identificationId, {
      transaction,
    });

    if (!identification) {
      throw CustomError.notFound('Identification not found');
    }

    if (createPersonalInformationDto.personTypeId) {
      const personType = await PersonType.findOne({
        where: {
          id: createPersonalInformationDto.personTypeId,
        },
        transaction,
      });

      if (!personType) {
        throw CustomError.notFound('Person type not found');
      }
    }

    const nit = Identifications.NIT === identification.code;
    const nitForeign = Identifications.NIT_PAIS === identification.code;
    if (!nit && !nitForeign) {
      const personType = await PersonType.findOne({
        where: {
          code: PersonTypes.PERSONA_NATURAL,
        },
        transaction,
      });

      if (!personType) {
        throw CustomError.notFound('Person type not found');
      }

      createPersonalInformationDto.personTypeId = personType.id;
    }

    const error: string | null = PersonalInformationEntity.validateDto(
      createPersonalInformationDto,
      <Identifications>identification.code
    );
    if (error) {
      throw CustomError.badRequest(error);
    }

    const personalInformationExist = await PersonalInformation.findOne({
      where: {
        documentNumber: createPersonalInformationDto.documentNumber,
        identificationId: createPersonalInformationDto.identificationId,
      },
      transaction,
      lock: Transaction.LOCK.UPDATE,
    });

    if (personalInformationExist) {
      throw CustomError.badRequest('User with this document number and identification already exist');
    }

    const personalInformation = await PersonalInformation.create(
      {
        dv: createPersonalInformationDto.dv,
        firstName: createPersonalInformationDto.firstName,
        middleName: createPersonalInformationDto.middleName,
        firstSurname: createPersonalInformationDto.firstSurname,
        secondSurname: createPersonalInformationDto.secondSurname,
        businessName: createPersonalInformationDto.businessName,
        documentNumber: createPersonalInformationDto.documentNumber,
        personTypeId: createPersonalInformationDto.personTypeId,
        taxLiabilityId: createPersonalInformationDto.taxLiabilityId,
        identificationId: createPersonalInformationDto.identificationId,
        userId,
      },
      { transaction }
    );

    return PersonalInformationMapper(personalInformation);
  }

  private async createAddress(createAddressDto: CreateAddressDto, userId: number, transaction: Transaction) {
    const country = await Country.findByPk(createAddressDto.countryId, { transaction });
    if (!country) throw CustomError.badRequest('Pais no encontrado.');

    let error: string | null = null;
    const national = country.code === CountriesCodes.COLOMBIA;
    error = AddressEntity.validateDto(createAddressDto, national);
    if (national) {
      const [state, municipality] = await Promise.all([
        State.findByPk(createAddressDto.stateId!, { transaction }),
        Municipality.findByPk(createAddressDto.municipalityId!, { transaction }),
      ]);

      if (!state || !municipality) {
        error += `${!state ? ', Departamento no encontrado.' : ''}${!municipality ? ', Municipio no encontrado.' : ''}`;
      }
    }

    if (error) throw CustomError.badRequest(error);
    const address = await Address.create(
      {
        address: createAddressDto.address,
        stateId: createAddressDto.stateId,
        countryId: createAddressDto.countryId,
        stateName: createAddressDto.stateName,
        postalCode: createAddressDto.postalCode,
        municipalityId: createAddressDto.municipalityId,
        userId,
      },
      { transaction }
    );

    return AddressMapper(address);
  }

  private async createContactInformation(
    contactInformationDto: CreateContactInformationDto,
    userId: number,
    transaction: Transaction
  ) {
    const contactInformation = await ContactInformation.create(
      {
        mobile: contactInformationDto.mobile,
        phoneOne: contactInformationDto.phoneOne,
        phoneTwo: contactInformationDto.phoneTwo,
        userId,
      },
      { transaction }
    );

    return ContactInformationMapper(contactInformation);
  }

  private async assignRoles(assignRolesDto: AssignRoleDto[], userId: number, transaction: Transaction) {
    const roles = await Role.findAll({
      where: {
        code: {
          [Op.in]: assignRolesDto.map((dto) => dto.code),
        },
      },
      transaction,
    });

    if (roles.length !== assignRolesDto.length) throw CustomError.badRequest('Role not found');

    const assignedRoles = await AssignedRole.bulkCreate(
      assignRolesDto.map((dto) => ({
        userId,
        roleId: roles.find((role) => role.code === dto.code)!.id,
      })),
      { transaction }
    );

    return assignedRoles.map((assignedRole) => AssignRoleMapper({
      id: assignedRole.id,
      userId: assignedRole.userId,
      roleId: assignedRole.roleId,
    }));
  }

  private async createToken(userId: number, transaction: Transaction) {
    const tokenType = await TokenType.findOne({ where: { code: TokenTypeCodes.CONFIRM_EMAIL }, transaction });
    if (!tokenType) throw CustomError.notFound('Token type not found');

    const [errTokenDto, createTokenDto] = CreateTokenDto.create({
      token: this.uidAdapter.generate(18),
      expire: this.momentAdapter.addTimes(15, units.DAY),
      used: false,
      userId,
      tokenTypeId: tokenType.id,
    });

    if (errTokenDto) throw CustomError.internal();

    const token = await Token.create(createTokenDto, { transaction });
    return TokenMapper(token);
  }
}
