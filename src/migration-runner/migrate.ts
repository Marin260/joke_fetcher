import * as dotenv from 'dotenv';
dotenv.config();
import { Client } from 'pg';
import * as migrations from './migrations';

const dbClient = new Client({
  user: process.env.DB_USR,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
});

const runMigrations = async (
  migrations: { [key: string]: string },
  client: Client
) => {
  console.log(
    `MigrationRunner::runMigrations() - Running ${
      Object.values(migrations).length
    } migration scripts`
  );

  client.connect();
  console.log(
    'MigrationRunner::runMigrations() - Connecting to the database...'
  );
  try {
    for (const migrationScript of Object.values(migrations))
      await dbClient.query(migrationScript);
  } catch (error) {
    console.log(
      'MigrationRunner::runMigrations() - Error while running migration scripts'
    );
  }

  console.log(
    'MigrationRunner::runMigrations() - Closing database connections...'
  );

  client.end();
};

runMigrations(migrations, dbClient);
