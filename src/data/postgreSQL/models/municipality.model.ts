
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasOneGetAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import User from './user.model';
import State from './state.model';
import { sequelize } from '../postgreSQL-database';

export default class Municipality extends Model<InferAttributes<Municipality>, InferCreationAttributes<Municipality>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare stateId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare state?: State;
  declare getState: HasOneGetAssociationMixin<State>;

  declare users?: Municipality[];
  declare getUsers: HasManyGetAssociationsMixin<User>;

  static associate(): void {
    Municipality.belongsToMany(User, {
      through: 'AssignedMunicipality',
      foreignKey: 'municipalityId',
      otherKey: 'userId',
      as: 'users',
    });

    Municipality.belongsTo(State, { as: 'state', targetKey: 'id', foreignKey: 'stateId' });
  }
}

Municipality.init(
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
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: State,
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
    tableName: 'Municipalities',
  }
);
