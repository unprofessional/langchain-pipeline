import pg from 'pg';
import { PGlite } from '@electric-sql/pglite';
import env from '../config/env.config.js';
import { createTableChatMemory } from './sql/index.js';

const { Pool } = pg;

let pool;

// Use PGlite if running tests
if (process.env.NODE_ENV === 'development') {
  console.warn('>>> NODE_ENV is set to "development"!');

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
