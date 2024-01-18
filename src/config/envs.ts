import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DB_USERNAME: get('DB_USERNAME').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),
  DB_HOSTNAME: get('DB_HOSTNAME').required().asString(),
  DB_PORT: get('DB_PORT').required().asPortNumber(),
  DB_MIGRATE_STORAGE: get('DB_MIGRATE_STORAGE').required().asString(),
  SMTP_HOST: get('SMTP_HOST').required().asString(),
  SMTP_USER: get('SMTP_USER').required().asString(),
  SMTP_PORT: get('SMTP_PORT').required().asPortNumber(),
  SMTP_PASSWORD: get('SMTP_PASSWORD').required().asString()
}
