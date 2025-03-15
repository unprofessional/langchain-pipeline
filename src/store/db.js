import { Pool } from 'pg';
import { PGlite } from '@electric-sql/pglite';
import env from '../config/env.config.js';

/**
 * TODO: Set up 'test' NODE_EN=test config for PGlite
 */

// TODO: Initialize a fresh, blank DB
const testDb = new PGlite();
testDb.query();

export const pool = new Pool({
  user: env.PG_USER,
  password: env.PG_PASS,
  host: env.PG_HOST,
  port: env.PG_PORT,
  database: env.PG_DB,
});
