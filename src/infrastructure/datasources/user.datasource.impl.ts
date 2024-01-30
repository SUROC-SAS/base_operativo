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
import { UserDataSource } from '#/domain';
import { sequelize } from '#/data/postgreSQL';
import { CustomError } from '#/domain/errors/custom.error';
import { TokenMapper } from '../mappers/user/token.mapper';
import { AddressMapper } from '../mappers/user/address.mapper';
import { SaveUserDtos, SaveUserDtos } from '#/domain/interfaces';
import { TimeAdapter, UbcryptAdapter, units } from '#/domain/interfaces';
import { CountriesCodes } from '../interfaces/user/countries.interfaces';
import { UuidAdapter } from '#/domain/interfaces/adapters/uuid.adapter.interface';
import { ContactInformationMapper } from '../mappers/user/contactInformation.mapper';
import { UserMapper } from '../mappers';
import { Op, Transaction } from 'sequelize';
import { PersonalInformationMapper } from '../mappers/user/personalInformation.mapper';
import { Identifications, PersonTypes, TokenTypeCodes } from '#/infrastructure/interfaces';
import {
  SaveAddressDto,
  SaveContactInformationDto,
  SavePersonalInformationDto,
  SaveTokenDto,
  UpdateAddressDto,
  UpdateContactInformationDto,
  UpdatePersonalInformationDto,
} from '#/domain/dtos';

export class UserDataSourceImpl implements UserDataSource {
  constructor(
    private readonly uidAdapter: UuidAdapter,
    private readonly momentAdapter: TimeAdapter,
    private readonly bcryptAdapter: UbcryptAdapter
  ) {}

  async createUser({ createUserDto, createAddressDto, createContactInformationDto, createPersonalInformationDto }: SaveUserDtos) {
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
    createPersonalInformationDto: SavePersonalInformationDto,
    userId: number,
    transaction: Transaction
  ) {
    const identification = await Identification.findByPk(createPersonalInformationDto.identificationId, {
      transaction,
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
          code: PersonTypes.PERSONA_NATURAL,
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

  private async createAddress(createAddressDto: SaveAddressDto, userId: number, transaction: Transaction) {
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

      if (!state || !municipality)
        error += `${!state ? ', Departamento no encontrado.' : ''}${!municipality ? ', Municipio no encontrado.' : ''}`;
    } else {
      error = createAddressDto.validateForeign();
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

  async updateUser({ updateUserDto, updateAddressDto, updateContactInformationDto, updatePersonalInformationDto }: SaveUserDtos) {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const user = await User.findByPk(updateUserDto.id, { transaction });

      if (!user) throw CustomError.badRequest('User not exist');

      const userExit = await User.findOne({
        where: {
          email: updateUserDto.email,
          id: { [Op.ne]: user.id },
        },
        transaction,
        lock: Transaction.LOCK.UPDATE,
      });

      if (userExit) throw CustomError.badRequest('User with this email already exist');

      await user.update({ email: updateUserDto.email }, { transaction });
      await user.reload({ transaction });

      const [personalInformation, contactInformation, address] = await Promise.all([
        this.updatePersonalInformation(updatePersonalInformationDto, user, transaction),
        this.updateContactInformation(updateContactInformationDto, user, transaction),
        this.updateAddress(updateAddressDto, user, transaction),
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
    updatePersonalInformationDto: UpdatePersonalInformationDto,
    user: User,
    transaction: Transaction
  ) {
    const personalInformation = await user.getPersonalInformation({ transaction });
    if (!personalInformation) throw CustomError.notFound('Personal Information not found');

    const identification = await Identification.findByPk(updatePersonalInformationDto.identificationId, { transaction });
    if (!identification) throw CustomError.notFound('Identification not found');

    let error: string | null = null;
    const nit = Identifications.NIT === identification.code;
    const nitForeign = Identifications.NIT_PAIS === identification.code;

    if (nitForeign) {
      error = updatePersonalInformationDto.validateForeign();
    } else if (nit) {
      error = updatePersonalInformationDto.validateNit();
    } else {
      const personType = await PersonType.findOne({
        where: {
          code: PersonTypes.PERSONA_NATURAL,
        },
        transaction,
      });

      if (!personType) throw CustomError.notFound('Person type not found');

      updatePersonalInformationDto.personTypeId = personType.id;
      error = updatePersonalInformationDto.validateNational();
    }

    if (error) throw CustomError.badRequest(error);

    if (nit) {
      const personType = await PersonType.findOne({
        where: {
          id: updatePersonalInformationDto.personTypeId,
        },
        transaction,
      });

      if (!personType) {
        throw CustomError.notFound('Person type not found');
      }
    }

    const personalInformationExist = await PersonalInformation.findOne({
      where: {
        documentNumber: updatePersonalInformationDto.documentNumber,
        identificationId: updatePersonalInformationDto.identificationId,
        id: { [Op.ne]: personalInformation.id },
      },
      transaction,
      lock: Transaction.LOCK.UPDATE,
    });

    if (personalInformationExist) throw CustomError.badRequest('User with this document number and identification already exist');

    await personalInformation.update(
      {
        dv: updatePersonalInformationDto.dv,
        firstName: updatePersonalInformationDto.firstName,
        middleName: updatePersonalInformationDto.middleName,
        firstSurname: updatePersonalInformationDto.firstSurname,
        secondSurname: updatePersonalInformationDto.secondSurname,
        businessName: updatePersonalInformationDto.businessName,
        documentNumber: updatePersonalInformationDto.documentNumber,
        personTypeId: updatePersonalInformationDto.personTypeId,
        taxLiabilityId: updatePersonalInformationDto.taxLiabilityId,
        identificationId: updatePersonalInformationDto.identificationId,
      },
      { transaction }
    );

    await personalInformation.reload({ transaction });

    return PersonalInformationMapper(personalInformation);
  }

  private async updateAddress(updateAddressDto: UpdateAddressDto, user: User, transaction: Transaction) {
    const address = await user.getAddress({ transaction });
    if (!address) throw CustomError.badRequest('Address no encontrado.');

    const country = await Country.findByPk(updateAddressDto.countryId, { transaction });
    if (!country) throw CustomError.badRequest('Pais no encontrado.');

    let error: string | null = null;
    const national = country.code === CountriesCodes.COLOMBIA;
    if (national) {
      error = updateAddressDto.validateNational();

      const [state, municipality] = await Promise.all([
        State.findByPk(updateAddressDto.stateId, { transaction }),
        Municipality.findByPk(updateAddressDto.municipalityId, { transaction }),
      ]);

      if (!state || !municipality)
        error += `${!state ? ', Departamento no encontrado.' : ''}${!municipality ? ', Municipio no encontrado.' : ''}`;
    } else {
      error = updateAddressDto.validateForeign();
    }

    if (error) throw CustomError.badRequest(error);

    await address.update(
      {
        address: updateAddressDto.address,
        stateId: updateAddressDto.stateId,
        countryId: updateAddressDto.countryId,
        stateName: updateAddressDto.stateName,
        postalCode: updateAddressDto.postalCode,
        municipalityId: updateAddressDto.municipalityId,
      },
      { transaction }
    );

    await address.reload({ transaction });

    return AddressMapper(address);
  }

  private async updateContactInformation(
    updateContactInformationDto: UpdateContactInformationDto,
    user: User,
    transaction: Transaction
  ) {
    const contactInformation = await user.getContactInformation({ transaction });
    if (!contactInformation) throw CustomError.badRequest('Contact Information not fount');

    await contactInformation.update(
      {
        mobile: updateContactInformationDto.mobile,
        phoneOne: updateContactInformationDto.phoneOne,
        phoneTwo: updateContactInformationDto.phoneTwo,
      },
      { transaction }
    );

    await contactInformation.reload({ transaction });

    return ContactInformationMapper(contactInformation);
  }
}
