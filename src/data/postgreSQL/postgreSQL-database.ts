import { envs } from '../../config';
import { Sequelize } from 'sequelize';

const config = {
  port: envs.DB_PORT,
  host: envs.DB_HOSTNAME,
  database: envs.DB_NAME,
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
};

export const sequelize = new Sequelize({
  logging: false,
  host: config.host,
  port: config.port,
  dialect: 'postgres',
  username: config.username,
  password: config.password,
  database: config.database,
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
    State: require('./models/state.model').default,
    Token: require('./models/token.model').default,
    Country: require('./models/country.model').default,
    Address: require('./models/address.model').default,
    TokenType: require('./models/token-type.model').default,
    PersonType: require('./models/person-type.model').default,
    Municipality: require('./models/municipality.model').default,
    TaxLiability: require('./models/tax-liability.model').default,
    AssignedRole: require('./models/assigned-role.model').default,
    Identification: require('./models/identification.model').default,
    ContactInformation: require('./models/contact-information.model').default,
    PersonalInformation: require('./models/personal-information.model').default,
    AssignedMunicipality: require('./models/assigned-municipality.model').default,
  };

  Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));

  return models;
}