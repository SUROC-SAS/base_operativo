import User from "#/data/postgreSQL/models/user.model";
import Token from "#/data/postgreSQL/models/token.model";
import State from "#/data/postgreSQL/models/state.model";
import Country from "#/data/postgreSQL/models/country.model";
import Address from "#/data/postgreSQL/models/address.model";
import TokenType from "#/data/postgreSQL/models/token-type.model";
import PersonType from "#/data/postgreSQL/models/person-type.model";
import Municipality from "#/data/postgreSQL/models/municipality.model";
import Identification from "#/data/postgreSQL/models/identification.model";
import ContactInformation from "#/data/postgreSQL/models/contact-information.model";
import PersonalInformation from "#/data/postgreSQL/models/personal-information.model";
import { UserMapper } from "../mappers";
import { Transaction } from "sequelize";
import { UserDataSource } from "#/domain";
import { sequelize } from "#/data/postgreSQL";
import { CreateUserDtos } from "#/domain/interfaces";
import { TimeAdapter, units } from "#/domain/interfaces";
import { TokenMapper } from "../mappers/user/token.mapper";
import { CustomError } from "#/domain/errors/custom.error";
import { AddressMapper } from "../mappers/user/address.mapper";
import { BcryptAdapter } from "#/config/adapters/bcrypt.adapter";
import { CountriesCodes } from "../interfaces/user/countries.interfaces";
import { UuidAdapter } from "#/domain/interfaces/adapters/uuid.adapter.interface";
import { ContactInformationMapper } from "../mappers/user/contactInformation.mapper";
import { PersonalInformationMapper } from "../mappers/user/personalInformation.mapper";
import { Identifications, PersonTypes, TokenTypeCodes } from '#/infrastructure/interfaces';
import { CreateAddressDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateTokenDto } from "#/domain/dtos";

export class UserDataSourceImpl implements UserDataSource {
  constructor(
    private readonly uidAdapter: UuidAdapter,
    private readonly momentAdapter: TimeAdapter,
    private readonly bcryptAdapter: BcryptAdapter,
  ) { }

  async createUser({
    createUserDto,
    createAddressDto,
    createContactInformationDto,
    createPersonalInformationDto,
  }: CreateUserDtos) {

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
        lastAccess: createUserDto.lastAccess,
        emailValidate: createUserDto.emailValidate,
        password: this.bcryptAdapter.encrypt(createUserDto.password, 10),
      }, { transaction });

      const token = await this.createToken(user.id, transaction);
      const personalInformation = await this.createPersonalInformation(createPersonalInformationDto, user.id, transaction);
      const contactInformation = await this.createContactInformation(createContactInformationDto, user.id, transaction);
      const address = await this.createAddress(createAddressDto, user.id, transaction);

      const userMapper = UserMapper(user);
      userMapper.address = address;
      userMapper.personalInformation = personalInformation;
      userMapper.contactInformation = contactInformation;

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

  private async createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transaction: Transaction) {
    const identification = await Identification.findByPk(createPersonalInformationDto.identificationId, {
      transaction
    });

    if (!identification) {
      throw CustomError.notFound('Identification not found');
    }

    let error: string | null = null;
    const nit = Identifications.NIT === identification.code;
    const nitForeign = Identifications.NIT_PAIS === identification.code;
    if (nitForeign) {
      error = createPersonalInformationDto.validateForeign();
    } else if (nit) {
      error = createPersonalInformationDto.validateNit();
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

      createPersonalInformationDto.personTypeId = personType.id;
      error = createPersonalInformationDto.validateNational();
    }

    if (error) {
      throw CustomError.badRequest(error);
    }

    if (nit) {
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

    const personalInformation = await PersonalInformation.create({
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
    }, { transaction });

    return PersonalInformationMapper(personalInformation);
  }

  private async createAddress(createAddressDto: CreateAddressDto, userId: number, transaction: Transaction) {
    const country = await Country.findByPk(createAddressDto.countryId, { transaction });
    if (!country) throw CustomError.badRequest('Pais no encontrado.');

    let error: string | null = null;
    const national = country.code === CountriesCodes.COLOMBIA;
    if (national) {
      error = createAddressDto.validateNational();

      const [state, municipality] = await Promise.all([
        State.findByPk(createAddressDto.stateId, { transaction }),
        Municipality.findByPk(createAddressDto.municipalityId, { transaction }),
      ]);

      if (!state || !municipality) error += `${!state ? ', Departamento no encontrado.' : ''}${!municipality ? ', Municipio no encontrado.' : ''}`
    } else {
      error = createAddressDto.validateForeign();
    }

    if (error) throw CustomError.badRequest(error);

    const address = await Address.create({
      address: createAddressDto.address,
      stateId: createAddressDto.stateId,
      countryId: createAddressDto.countryId,
      stateName: createAddressDto.stateName,
      postalCode: createAddressDto.postalCode,
      municipalityId: createAddressDto.municipalityId,
      userId,
    }, { transaction });

    return AddressMapper(address);
  }

  private async createContactInformation(contactInformationDto: CreateContactInformationDto, userId: number, transaction: Transaction) {
    const contactInformation = await ContactInformation.create({
      mobile: contactInformationDto.mobile,
      phoneOne: contactInformationDto.phoneOne,
      phoneTwo: contactInformationDto.phoneTwo,
      userId,
    }, { transaction });

    return ContactInformationMapper(contactInformation);
  }

  private async createToken(userId: number, transaction: Transaction) {
    const tokenType = await TokenType.findOne({ where: { code: TokenTypeCodes.CONFIRM_EMAIL }, transaction });

    const [errTokenDto, createTokenDto] = CreateTokenDto.create({
      token: this.uidAdapter.generate(18),
      expire: this.momentAdapter.addTimes(15, units.DAY),
      used: false,
      tokenTypeId: tokenType!.id,
      userId,
    });

    if (errTokenDto) throw CustomError.internal();

    const token = await Token.create(
      createTokenDto,
      { transaction }
    );

    return TokenMapper(token);
  }
}