/* eslint-disable no-underscore-dangle */
import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres';
import { BufferMemory } from 'langchain/memory';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from 'pg';
import env from '../config/env.config.js';
import initLogger from '../utils/winston-logger.js';
const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Create our own SQL file tool/abstraction
const trimOldest = readFileSync(path.resolve(__dirname, '../store/sql/delete_oldest_msgs_by_session_id.sql'), 'utf8');

const pool = new Pool({
  user: env.PG_USER,
  password: env.PG_PASS,
  host: env.PG_HOST,
  port: env.PG_PORT,
  database: env.PG_DB,
});

const logger = initLogger();

export const createPersistentMemory = async(sessionId) => {
  const messageHistory = new PostgresChatMessageHistory({
    pool,
    tableName: 'chat_memory',
    sessionId,
  });

  return new BufferMemory({ chatHistory: messageHistory });
};

export const trimOldestMsgsBySessionId = async(maxExchanges = 50, sessionId) => {
  const numOfMessageRecords = maxExchanges * 2;

  try {
    const paramQuery = trimOldest;
    const paramValues = [sessionId, numOfMessageRecords];
      
    const resultSet = await pool.query(paramQuery, paramValues);

    // Check if resultSet is undefined or null
    logger.info(`>>> conversation.service > trimOldestMsgsBySessionId > resultSet: ${resultSet ? 'Valid resultSet received' : 'No resultSet received'}`);

    // Log object structure before stringifying
    // if (resultSet) {
    //   logger.info(`resultSet Type: ${typeof resultSet}`);
    //   logger.info(`resultSet Keys: ${Object.keys(resultSet)}`);
    // }

    // Stringify safely
    // logger.info(`resultSet JSON: ${JSON.stringify(resultSet, null, 2)}`);

    return resultSet;
  } catch (err) {
    logger.error(`Error in trimOldestMsgsBySessionId: ${err.message}`);
  }
};
