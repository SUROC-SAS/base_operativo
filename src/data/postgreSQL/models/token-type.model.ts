import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import Token from './token.model';
import { sequelize } from '../postgreSQL-database';

export default class TokenType extends Model<InferAttributes<TokenType>, InferCreationAttributes<TokenType>> {
  declare id: CreationOptional<number>;
  declare code: string;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare tokens?: Token[];
  declare getTokens: HasManyGetAssociationsMixin<Token>;

  static associate(): void {
    TokenType.hasMany(Token, { as: 'tokens', sourceKey: 'id', foreignKey: 'tokenTypeId' });
  }
}

TokenType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
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
    tableName: 'TokenTypes',
  }
);