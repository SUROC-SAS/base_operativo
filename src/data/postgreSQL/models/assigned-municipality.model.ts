import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
} from 'sequelize';
import User from './user.model';
import Municipality from './municipality.model';
import { sequelize } from '../postgreSQL-database';

export default class AssignedMunicipality extends Model<InferAttributes<AssignedMunicipality>, InferCreationAttributes<AssignedMunicipality>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare municipalityId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare user?: User;
  declare getUser: HasOneGetAssociationMixin<User>;

  declare municipality?: Municipality;
  declare getMunicipality: HasOneGetAssociationMixin<Municipality>;

  static associate(): void {
    AssignedMunicipality.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'usr' });
    AssignedMunicipality.belongsTo(Municipality, { foreignKey: 'municipalityId', targetKey: 'id', as: 'municipality' });
  }
}

AssignedMunicipality.init(
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
    municipalityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Municipality,
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
    tableName: 'AssignedMunicipalities',
  }
);