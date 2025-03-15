/* eslint-disable no-underscore-dangle */
import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres';
import { BufferMemory } from 'langchain/memory';
// import initLogger from '../utils/winston-logger.js';
import { pool } from '../store/db.js';
// import { trimOldest } from '../store/sql/index.js';

// const logger = initLogger();

export const createPersistentMemory = async (sessionId) => {
  const messageHistory = new PostgresChatMessageHistory({
    pool,
    tableName: 'chat_memory',
    sessionId,
  });

  return new BufferMemory({ chatHistory: messageHistory });
};

// export const trimOldestMsgsBySessionId = async (maxExchanges = 50, sessionId) => {
//   const numOfMessageRecords = maxExchanges * 2;

//   try {
//     const paramQuery = trimOldest;
//     const paramValues = [sessionId, numOfMessageRecords];
      
//     const resultSet = await pool.query(paramQuery, paramValues);

//     // Check if resultSet is undefined or null
//     logger.info(`>>> conversation.service > trimOldestMsgsBySessionId > resultSet: ${resultSet ? 'Valid resultSet received' : 'No resultSet received'}`);

//     // Log object structure before stringifying
//     // if (resultSet) {
//     //   logger.info(`resultSet Type: ${typeof resultSet}`);
//     //   logger.info(`resultSet Keys: ${Object.keys(resultSet)}`);
//     // }

//     // Stringify safely
//     // logger.info(`resultSet JSON: ${JSON.stringify(resultSet, null, 2)}`);

//     return resultSet;
//   } catch (err) {
//     logger.error(`Error in trimOldestMsgsBySessionId: ${err.message}`);
//   }
// };
