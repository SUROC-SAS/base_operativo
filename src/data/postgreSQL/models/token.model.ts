import {
  Model,
  DataTypes,
  ForeignKey,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
} from 'sequelize';
import { sequelize } from '../postgreSQL-database';
import User from './user.model';
import TokenType from './token-type.model';

export default class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  declare id: CreationOptional<number>;
  declare token: string;
  declare used: boolean;
  declare expire: Date;
  declare userId: ForeignKey<User['id']>;
  declare tokenTypeId: ForeignKey<TokenType['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare user?: User;
  declare getUser: HasOneGetAssociationMixin<User>;

  declare tokenType?: TokenType;
  declare getTokenType: HasOneGetAssociationMixin<TokenType>;

  static associate(): void {
    Token.belongsTo(User, { as: 'user', targetKey: 'id', foreignKey: 'userId' });
    Token.belongsTo(TokenType, { as: 'tokenType', targetKey: 'id', foreignKey: 'tokenTypeId' });
  }
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'Users',
      },
    },
    tokenTypeId: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'TokenTypes',
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
    tableName: 'Tokens',
  }
);