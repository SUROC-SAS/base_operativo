import { envs } from '../../config';
import { Sequelize } from 'sequelize';

const config = {
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  host: envs.DB_HOSTNAME,
  port: envs.DB_PORT,
};

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  port: config.port,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30_000,
    idle: 10_000,
  },
  define: {
    freezeTableName: true,
  },
});

export const initModels = () => {
  const models = {
    User: require('./models/user.model').default,
    Role: require('./models/role.model').default,
    AssignedRole: require('./models/assigned-role.model').default,
  };

  Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));

  return models;
}