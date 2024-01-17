
import User from './user.model';
import PersonType from './person-type.model';
import TaxLiability from './tax-liability.model';
import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
} from 'sequelize';
import { sequelize } from '../postgreSQL-database';
import Identification from './identification.model';

export default class PersonalInformation extends Model<InferAttributes<PersonalInformation>, InferCreationAttributes<PersonalInformation>> {
  declare id: CreationOptional<number>;
  declare firstName: CreationOptional<string>;
  declare middleName: CreationOptional<string>;
  declare firstSurname: CreationOptional<string>;
  declare secondSurname: CreationOptional<string>;
  declare businessName: CreationOptional<string>;
  declare documentNumber: number;
  declare dv: CreationOptional<number>;
  declare taxLiabilityId: CreationOptional<number>;
  declare identificationId: number;
  declare personTypeId: CreationOptional<number>;
  declare userId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare user?: User;
  declare getUser: HasOneGetAssociationMixin<User>;

  declare personType?: PersonType;
  declare getPersonType: HasOneGetAssociationMixin<PersonType>;

  declare taxLiability?: TaxLiability;
  declare getTaxLiability: HasOneGetAssociationMixin<TaxLiability>;

  declare identification?: Identification;
  declare getIdentification: HasOneGetAssociationMixin<Identification>;

  static associate(): void {
    PersonalInformation.belongsTo(User, { as: 'user', targetKey: 'id', foreignKey: 'userId' });
    PersonalInformation.belongsTo(PersonType, { as: 'personType', targetKey: 'id', foreignKey: 'personTypeId' });
    PersonalInformation.belongsTo(TaxLiability, { as: 'taxLiability', targetKey: 'id', foreignKey: 'taxLiabilityId' });
    PersonalInformation.belongsTo(Identification, { as: 'identification', targetKey: 'id', foreignKey: 'identificationId' });
  }
}

PersonalInformation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstSurname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondSurname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    documentNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    dv: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    taxLiabilityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        key: 'id',
        model: TaxLiability,
      },
    },
    identificationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: Identification,
      },
    },
    personTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        key: 'id',
        model: PersonType,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: User,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    paranoid: true,
    tableName: 'PersonalInformations',
  }
);
