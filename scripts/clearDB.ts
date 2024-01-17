import * as dotenv from 'dotenv';
dotenv.config();

import { sequelize } from '../src/data/postgreSQL';
export const clear = async (): Promise<void> => {
  if (!['local', 'test'].includes(<string>process.env.NODE_ENV)) {
    console.log(`Skipping dropping tables. Action not allowed in the environment '${process.env.NODE_ENV}`);
    process.exit(1);
  }

  await sequelize.getQueryInterface().dropAllTables();
  await sequelize.getQueryInterface().dropAllEnums();
};

clear();
