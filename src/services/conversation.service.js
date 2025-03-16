import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres';
import { BufferMemory } from 'langchain/memory';
// import initLogger from '../utils/winston-logger.js';
import { pool } from '../store/db.js';
import { trimOldestMsgsBySessionId } from '../store/dao/pipeline/conversation.dao.js';

// const logger = initLogger();

export const createPersistentMemory = async (sessionId) => {
  const messageHistory = new PostgresChatMessageHistory({
    pool,
    tableName: 'chat_memory',
    sessionId,
  });

  const bufferMemory = new BufferMemory({ chatHistory: messageHistory });

  await trimOldestMsgsBySessionId(50, sessionId);

  return bufferMemory;
};
