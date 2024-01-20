import { SequelizeModuleOptions } from '@nestjs/sequelize';
import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
} from 'src/common/constants';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres', // Replace with your database dialect
  host: DB_HOST, // Replace with your database host
  port: +DB_PORT, // Replace with your database port
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  autoLoadModels: true,
};
