import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
} from 'sequelize';
import User from './user.model';
import Role from './role.model';
import { sequelize } from '../postgreSQL-database';

export default class AssignedRole extends Model<InferAttributes<AssignedRole>, InferCreationAttributes<AssignedRole>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare roleId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare user?: User;
  declare getUser: HasOneGetAssociationMixin<User>;

  declare role?: Role;
  declare getRole: HasOneGetAssociationMixin<Role>;

  static associate(): void {
    AssignedRole.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
    AssignedRole.belongsTo(Role, { foreignKey: 'roleId', targetKey: 'id', as: 'role' });
  }
}

AssignedRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
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
    tableName: 'AssignedRoles',
  }
);
