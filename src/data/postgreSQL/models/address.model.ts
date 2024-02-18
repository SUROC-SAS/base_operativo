import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
} from 'sequelize';
import User from './user.model';
import State from './state.model';
import Country from './country.model';
import Municipality from './municipality.model';
import { sequelize } from '../postgreSQL-database';

export default class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  declare id: CreationOptional<number>;
  declare address: string;
  declare postalCode: CreationOptional<string | null>;
  declare stateName: CreationOptional<string | null>;
  declare stateId: CreationOptional<number | null>;
  declare municipalityId: CreationOptional<number | null>;
  declare countryId: number;
  declare userId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare user?: User;
  declare getUser: HasOneGetAssociationMixin<User>;

  declare country?: Country;
  declare getCountry: HasOneGetAssociationMixin<Country>;

  declare state?: State;
  declare getState: HasOneGetAssociationMixin<State>;

  static associate(): void {
    Address.belongsTo(User, { as: 'user', foreignKey: 'userId', targetKey: 'id' });
    Address.belongsTo(State, { as: 'state', foreignKey: 'stateId', targetKey: 'id' });
    Address.belongsTo(Country, { as: 'country', foreignKey: 'countryId', targetKey: 'id' });
  }
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    stateName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    municipalityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        key: 'id',
        model: Municipality,
      },
      defaultValue: null,
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        key: 'id',
        model: State,
      },
      defaultValue: null,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: Country,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'Addresses',
  }
);
