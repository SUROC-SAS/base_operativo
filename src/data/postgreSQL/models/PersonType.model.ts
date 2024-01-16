
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../postgreSQL-database';

export default class PersonType extends Model<InferAttributes<PersonType>, InferCreationAttributes<PersonType>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

PersonType.init(
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
    tableName: 'PersonTypes',
  }
);
