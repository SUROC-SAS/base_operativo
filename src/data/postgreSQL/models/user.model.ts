import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { sequelize } from '../postgreSQL-database';
import ContactInformation from './contact-information.model';
import PersonalInformation from './personal-information.model';
import Role from './role.model';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare uid: CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare emailValidate: boolean;
  declare active: boolean;
  declare lastAccess?: CreationOptional<Date> | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare personalInformation?: PersonalInformation;
  declare getPersonalInformation: HasOneGetAssociationMixin<PersonalInformation>;

  declare roles?: Role[];
  declare getRoles: HasManyGetAssociationsMixin<Role>;

  declare contactInformation?: ContactInformation;
  declare getContactInformation: HasOneGetAssociationMixin<ContactInformation>;

  static associate(): void {
    User.hasOne(ContactInformation, { as: 'contactInformation', sourceKey: 'id', foreignKey: 'userId' });
    User.hasOne(PersonalInformation, { as: 'personalInformation', sourceKey: 'id', foreignKey: 'userId' });

    User.belongsToMany(Role, {
      through: 'AssignedRoles',
      foreignKey: 'userId',
      otherKey: 'roleId',
      as: 'roles',
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailValidate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastAccess: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'Users',
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  }
);
