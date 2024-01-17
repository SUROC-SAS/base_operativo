
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import State from './state.model';
import Address from './address.model';
import { sequelize } from '../postgreSQL-database';

export default class Country extends Model<InferAttributes<Country>, InferCreationAttributes<Country>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare addresses?: Address[];
  declare getAddresses: HasManyGetAssociationsMixin<Address>;

  declare states?: State[];
  declare getStates: HasManyGetAssociationsMixin<State>;

  static associate(): void {
    Country.hasMany(State, { as: 'states', sourceKey: 'id', foreignKey: 'countryId' });
    Country.hasMany(Address, { as: 'addresses', sourceKey: 'id', foreignKey: 'countryId' });
  }
}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'Countries',
  }
);
