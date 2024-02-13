import getenv from 'getenv';
import { knexSnakeCaseMappers } from 'objection';

const dbConfig = {
  client: 'postgres',
  connection: {
    host: getenv('DB_HOST'),
    port: getenv('DB_PORT'),
    user: getenv('DB_USERNAME'),
    password: getenv('DB_PASSWORD'),
    // database: getenv('DB_DATABASE'),
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
  useNullAsDefault: true,
  ...knexSnakeCaseMappers(),
};

export default dbConfig;
