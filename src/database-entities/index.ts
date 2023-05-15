import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize-typescript';
import * as Models from './entities';

export const db = () => {
  console.log('Connecting to DB...');
  return new Sequelize({
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    username: process.env.DB_USR,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    dialect: 'postgres',
    models: [Models.ChuckUser],
    logging: process.env.DEBUG ? evalStringBool(process.env.DEBUG) : false,
  });
};

const evalStringBool = (expression: string) => expression === 'true';
