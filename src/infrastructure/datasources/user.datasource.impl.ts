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
import { UserMapper } from '../mappers';
import { UserDataSource } from '#/domain';
import { Op, Transaction } from 'sequelize';
import { sequelize } from '#/data/postgreSQL';
import { CustomError } from '#/domain/errors/custom.error';
import { TokenMapper } from '../mappers/user/token.mapper';
import { AddressMapper } from '../mappers/user/address.mapper';
import { SaveUserDtos, UpdateUserDtos } from '#/domain/interfaces';
import { TimeAdapter, UbcryptAdapter, units } from '#/domain/interfaces';
import { CountriesCodes } from '../interfaces/user/countries.interfaces';
import { UuidAdapter } from '#/domain/interfaces/adapters/uuid.adapter.interface';
import { ContactInformationMapper } from '../mappers/user/contactInformation.mapper';
import { PersonalInformationMapper } from '../mappers/user/personalInformation.mapper';
import { Identifications, PersonTypes, TokenTypeCodes } from '#/infrastructure/interfaces';
import {
  SaveTokenDto,
  SaveAddressDto,
  SaveContactInformationDto,
  SavePersonalInformationDto,
} from '#/domain/dtos';

export class UserDataSourceImpl implements UserDataSource {
  constructor(
    private readonly uidAdapter: UuidAdapter,
    private readonly momentAdapter: TimeAdapter,
    private readonly bcryptAdapter: UbcryptAdapter
  ) { }

  async createUser({ saveUserDto, saveAddressDto, saveContactInformationDto, savePersonalInformationDto }: SaveUserDtos) {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const userExit = await User.findOne({
        where: {
          email: saveUserDto.email,
        },
        transaction,
        lock: Transaction.LOCK.UPDATE,
      });

      if (userExit) {
        throw CustomError.badRequest('User with this email already exist');
      }

      const user = await User.create(
        {
          email: saveUserDto.email,
          active: saveUserDto.active,
          lastAccess: saveUserDto.lastAccess,
          emailValidate: saveUserDto.emailValidate,
          password: this.bcryptAdapter.encrypt(saveUserDto.password, 10),
        },
        { transaction }
      );

      await user.update({ uid: `US${user.id + 1000}` }, { transaction });

      const personalInformation = await this.createPersonalInformation(savePersonalInformationDto, user.id, transaction);
      const contactInformation = await this.createContactInformation(saveContactInformationDto, user.id, transaction);
      const address = await this.createAddress(saveAddressDto, user.id, transaction);

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

  private async createPersonalInformation(
    savePersonalInformationDto: SavePersonalInformationDto,
    userId: number,
    transaction: Transaction
  ) {
    const identification = await Identification.findByPk(savePersonalInformationDto.identificationId, {
      transaction,
    });

    if (!identification) {
      throw CustomError.notFound('Identification not found');
    }

    let error: string | null = null;
    const nit = Identifications.NIT === identification.code;
    const nitForeign = Identifications.NIT_PAIS === identification.code;
    if (nitForeign) {
      error = savePersonalInformationDto.validateForeign();
    } else if (nit) {
      error = savePersonalInformationDto.validateNit();
    } else {
      const personType = await PersonType.findOne({
        where: {
          code: PersonTypes.PERSONA_NATURAL,
        },
        transaction,
      });

      if (!personType) {
        throw CustomError.notFound('Person type not found');
      }

      savePersonalInformationDto.personTypeId = personType.id;
      error = savePersonalInformationDto.validateNational();
    }

    if (error) {
      throw CustomError.badRequest(error);
    }

    if (nit) {
      const personType = await PersonType.findOne({
        where: {
          id: savePersonalInformationDto.personTypeId,
        },
        transaction,
      });

      if (!personType) {
        throw CustomError.notFound('Person type not found');
      }
    }

    const personalInformationExist = await PersonalInformation.findOne({
      where: {
        documentNumber: savePersonalInformationDto.documentNumber,
        identificationId: savePersonalInformationDto.identificationId,
      },
      transaction,
      lock: Transaction.LOCK.UPDATE,
    });

    if (personalInformationExist) {
      throw CustomError.badRequest('User with this document number and identification already exist');
    }

    const personalInformation = await PersonalInformation.create(
      {
        dv: savePersonalInformationDto.dv,
        firstName: savePersonalInformationDto.firstName,
        middleName: savePersonalInformationDto.middleName,
        firstSurname: savePersonalInformationDto.firstSurname,
        secondSurname: savePersonalInformationDto.secondSurname,
        businessName: savePersonalInformationDto.businessName,
        documentNumber: savePersonalInformationDto.documentNumber,
        personTypeId: savePersonalInformationDto.personTypeId,
        taxLiabilityId: savePersonalInformationDto.taxLiabilityId,
        identificationId: savePersonalInformationDto.identificationId,
        userId,
      },
      { transaction }
    );

    return PersonalInformationMapper(personalInformation);
  }

  private async createAddress(saveAddressDto: SaveAddressDto, userId: number, transaction: Transaction) {
    const country = await Country.findByPk(saveAddressDto.countryId, { transaction });
    if (!country) throw CustomError.badRequest('Pais no encontrado.');

    let error: string | null = null;
    const national = country.code === CountriesCodes.COLOMBIA;
    if (national) {
      error = saveAddressDto.validateNational();

      const [state, municipality] = await Promise.all([
        State.findByPk(saveAddressDto.stateId, { transaction }),
        Municipality.findByPk(saveAddressDto.municipalityId, { transaction }),
      ]);

      if (!state || !municipality)
        error += `${!state ? ', Departamento no encontrado.' : ''}${!municipality ? ', Municipio no encontrado.' : ''}`;
    } else {
      error = saveAddressDto.validateForeign();
    }

    if (error) throw CustomError.badRequest(error);

    const address = await Address.create(
      {
        address: saveAddressDto.address,
        stateId: saveAddressDto.stateId,
        countryId: saveAddressDto.countryId,
        stateName: saveAddressDto.stateName,
        postalCode: saveAddressDto.postalCode,
        municipalityId: saveAddressDto.municipalityId,
        userId,
      },
      { transaction }
    );

    return AddressMapper(address);
  }

  private async createContactInformation(
    contactInformationDto: SaveContactInformationDto,
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

  private async createToken(userId: number, transaction: Transaction) {
    const tokenType = await TokenType.findOne({ where: { code: TokenTypeCodes.CONFIRM_EMAIL }, transaction });

    const [errTokenDto, createTokenDto] = SaveTokenDto.create({
      token: this.uidAdapter.generate(18),
      expire: this.momentAdapter.addTimes(15, units.DAY),
      used: false,
      tokenTypeId: tokenType!.id,
      userId,
    });

    if (errTokenDto) throw CustomError.internal();

    const token = await Token.create(createTokenDto, { transaction });

    return TokenMapper(token);
  }

  async updateUser({ saveUserDto, saveAddressDto, saveContactInformationDto, savePersonalInformationDto }: UpdateUserDtos) {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const user = await User.findByPk(saveUserDto.id, { transaction });
      if (!user) throw CustomError.badRequest('User not exist');

      const userExit = await User.findOne({
        where: {
          email: saveUserDto.email,
          id: { [Op.ne]: user.id },
        },
        transaction,
        lock: Transaction.LOCK.UPDATE,
      });

      if (userExit) throw CustomError.badRequest('User with this email already exist');

      await user.update({ email: saveUserDto.email }, { transaction });
      await user.reload({ transaction });

      const [personalInformation, contactInformation, address] = await Promise.all([
        this.updatePersonalInformation(savePersonalInformationDto, user, transaction),
        this.updateContactInformation(saveContactInformationDto, user, transaction),
        this.updateAddress(saveAddressDto, user, transaction),
      ]);

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

  private async updatePersonalInformation(
    savePersonalInformationDto: SavePersonalInformationDto,
    user: User,
    transaction: Transaction
  ) {
    const personalInformation = await user.getPersonalInformation({ transaction });
    if (!personalInformation) throw CustomError.notFound('Personal Information not found');

    const identification = await Identification.findByPk(savePersonalInformationDto.identificationId, { transaction });
    if (!identification) throw CustomError.notFound('Identification not found');

    let error: string | null = null;
    const nit = Identifications.NIT === identification.code;
    const nitForeign = Identifications.NIT_PAIS === identification.code;

    if (nitForeign) {
      error = savePersonalInformationDto.validateForeign();
    } else if (nit) {
      error = savePersonalInformationDto.validateNit();
    } else {
      const personType = await PersonType.findOne({
        where: {
          code: PersonTypes.PERSONA_NATURAL,
        },
        transaction,
      });

      if (!personType) throw CustomError.notFound('Person type not found');

      savePersonalInformationDto.personTypeId = personType.id;
      error = savePersonalInformationDto.validateNational();
    }

    if (error) throw CustomError.badRequest(error);

    if (nit) {
      const personType = await PersonType.findOne({
        where: {
          id: savePersonalInformationDto.personTypeId,
        },
        transaction,
      });

      if (!personType) {
        throw CustomError.notFound('Person type not found');
      }
    }

    const personalInformationExist = await PersonalInformation.findOne({
      where: {
        documentNumber: savePersonalInformationDto.documentNumber,
        identificationId: savePersonalInformationDto.identificationId,
        id: { [Op.ne]: personalInformation.id },
      },
      transaction,
      lock: Transaction.LOCK.UPDATE,
    });

    if (personalInformationExist) throw CustomError.badRequest('User with this document number and identification already exist');

    await personalInformation.update(
      {
        dv: savePersonalInformationDto.dv,
        firstName: savePersonalInformationDto.firstName,
        middleName: savePersonalInformationDto.middleName,
        firstSurname: savePersonalInformationDto.firstSurname,
        secondSurname: savePersonalInformationDto.secondSurname,
        businessName: savePersonalInformationDto.businessName,
        documentNumber: savePersonalInformationDto.documentNumber,
        personTypeId: savePersonalInformationDto.personTypeId,
        taxLiabilityId: savePersonalInformationDto.taxLiabilityId,
        identificationId: savePersonalInformationDto.identificationId,
      },
      { transaction }
    );

    await personalInformation.reload({ transaction });

    return PersonalInformationMapper(personalInformation);
  }

  private async updateAddress(saveAddressDto: SaveAddressDto, user: User, transaction: Transaction) {
    const address = await user.getAddress({ transaction });
    if (!address) throw CustomError.badRequest('Address no encontrado.');

    const country = await Country.findByPk(saveAddressDto.countryId, { transaction });
    if (!country) throw CustomError.badRequest('Pais no encontrado.');

    let error: string | null = null;
    const national = country.code === CountriesCodes.COLOMBIA;
    if (national) {
      error = saveAddressDto.validateNational();

      const [state, municipality] = await Promise.all([
        State.findByPk(saveAddressDto.stateId, { transaction }),
        Municipality.findByPk(saveAddressDto.municipalityId, { transaction }),
      ]);

      if (!state || !municipality)
        error += `${!state ? ', Departamento no encontrado.' : ''}${!municipality ? ', Municipio no encontrado.' : ''}`;
    } else {
      error = saveAddressDto.validateForeign();
    }

    if (error) throw CustomError.badRequest(error);

    await address.update(
      {
        address: saveAddressDto.address,
        stateId: saveAddressDto.stateId,
        countryId: saveAddressDto.countryId,
        stateName: saveAddressDto.stateName,
        postalCode: saveAddressDto.postalCode,
        municipalityId: saveAddressDto.municipalityId,
      },
      { transaction }
    );

    await address.reload({ transaction });

    return AddressMapper(address);
  }

  private async updateContactInformation(
    saveContactInformationDto: SaveContactInformationDto,
    user: User,
    transaction: Transaction
  ) {
    const contactInformation = await user.getContactInformation({ transaction });
    if (!contactInformation) throw CustomError.badRequest('Contact Information not fount');

    await contactInformation.update(
      {
        mobile: saveContactInformationDto.mobile,
        phoneOne: saveContactInformationDto.phoneOne,
        phoneTwo: saveContactInformationDto.phoneTwo,
      },
      { transaction }
    );

    await contactInformation.reload({ transaction });

    return ContactInformationMapper(contactInformation);
  }
}
