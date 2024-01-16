
import User from './User.model';
import PersonType from './PersonType.model';
import TaxLiability from './TaxLiability.model';
import Identification from './Identification.model';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../postgreSQL-database';

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
  declare documentTypeId: number;
  declare personTypeId: CreationOptional<number>;
  declare userId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
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
    documentTypeId: {
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
