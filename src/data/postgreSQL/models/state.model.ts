
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import Country from './country.model';
import Address from './address.model';
import Municipality from './municipality.model';
import { sequelize } from '../postgreSQL-database';

export default class State extends Model<InferAttributes<State>, InferCreationAttributes<State>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare countryId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare addresses?: Address[];
  declare getAddresses: HasManyGetAssociationsMixin<Address>;

  declare municipalities?: Municipality[];
  declare getMunicipalities: HasManyGetAssociationsMixin<Municipality>;

  declare country?: Country;
  declare getCountry: HasOneGetAssociationMixin<Country>;

  static associate(): void {
    State.belongsTo(Country, { as: 'country', targetKey: 'id', foreignKey: 'countryId' });
    State.hasMany(Address, { as: 'addresses', sourceKey: 'id', foreignKey: 'stateId' });
    State.hasMany(Municipality, { as: 'municipalities', sourceKey: 'id', foreignKey: 'stateId' });
  }
}

State.init(
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
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: Country,
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
    tableName: 'States',
  }
);
