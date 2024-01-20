import * as dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
  JWTKEY,
  EXPIRE,
} = process.env;
export const jwtConstants = {
  secret: JWTKEY,
};

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export interface Response {
  statusCode: number;
  result: unknown;
  message: string;
}
