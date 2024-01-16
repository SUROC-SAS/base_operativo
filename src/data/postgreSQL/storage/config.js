module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  migrationStorageTableSchema: 'public',
  migrationStorage: process.env.DB_MIGRATE_STORAGE,
  migrationStorageTableName: 'SequelizeMeta',
  seederStorage: process.env.DB_MIGRATE_STORAGE,
  seederStorageTableName: 'SequelizeData',
};