
import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
} from 'sequelize';
import User from './user.model';
import { sequelize } from '../postgreSQL-database';

export default class ContactInformation extends Model<InferAttributes<ContactInformation>, InferCreationAttributes<ContactInformation>> {
  declare id: CreationOptional<number>;
  declare mobile: number;
  declare phoneOne: CreationOptional<number>;
  declare phoneTwo: CreationOptional<number>;
  declare userId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare user?: User;
  declare getUser: HasOneGetAssociationMixin<User>;

  static associate() {
    ContactInformation.belongsTo(User, { as: 'user', targetKey: 'id', foreignKey: 'userId' });
  }
}

ContactInformation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    phoneOne: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    phoneTwo: {
      type: DataTypes.BIGINT,
      allowNull: true,
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
    tableName: 'ContactInformations',
  }
);
