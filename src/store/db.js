import pg from 'pg';
import { PGlite } from '@electric-sql/pglite';
import env from '../config/env.config.js';
import { createTableChatMemory } from './sql/index.js';
import initLogger from '../utils/winston-logger.js';

const { Pool } = pg;
const logger = initLogger();

let pool;

logger.debug(`>>> NODE_ENV: ${process.env.NODE_ENV}`);

// Use PGlite if running tests
if (process.env.NODE_ENV === 'test') {
  logger.info('>>> NODE_ENV is set to "test"!');

  pool = new PGlite();
  pool.query(createTableChatMemory);
} else {
  pool = new Pool({
    user: env.PG_USER,
    password: env.PG_PASS,
    host: env.PG_HOST,
    port: env.PG_PORT,
    database: env.PG_DB,
  });
}

export {
  pool,
};
