import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres';
import { BufferMemory } from 'langchain/memory';
import initLogger from '../utils/winston-logger.js';
import { pool } from '../store/db.js';

const logger = initLogger();

export const createPersistentMemory = async (sessionId) => {
  const messageHistory = new PostgresChatMessageHistory({
    pool,
    tableName: 'chat_memory',
    sessionId,
  });

  return new BufferMemory({ chatHistory: messageHistory });
};
