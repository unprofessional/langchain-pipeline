import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres';
import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import pkg from 'pg';
import env from '../config/env.config.js';
import { getOllamaLLM } from './providers/ollama.js';
import { getOpenAILLM } from './providers/openai.js';
const { Pool } = pkg;

// NOTE: This is strictly in-memory and memories/convos do not survive app restarts!
const memory = new BufferMemory();

// Initialize PostgreSQL Connection Pool
const pool = new Pool({
  user: env.PG_USER,
  password: env.PG_PASS,
  host: env.PG_HOST,
  port: env.PG_PORT,
  database: env.PG_DB,
});

export const createPersistentMemory = async(sessionId) => {
  const messageHistory = new PostgresChatMessageHistory({
    pool,
    tableName: 'chat_memory',
    sessionId,
  });

  return new BufferMemory({ chatHistory: messageHistory });
};

export const getLLMInstance = () => {
  if (env.MODEL_PROVIDER === 'openai') {
    console.log('Using OpenAI as LLM provider...');
    return getOpenAILLM();
  }
  console.log('Using Ollama as LLM provider...');
  return getOllamaLLM();
};

export const runPipeline = async(input) => {
  const llm = getLLMInstance();

  const response = await llm.invoke(input);
  return response;
};

export const runPipelineWithBufferMemory = async(input) => {
  const llm = getLLMInstance();

  const chain = new ConversationChain({ llm, memory });
  const response = await chain.invoke({ input });

  return response;
};

export const runPipelineWithPersistence = async(input, sessionId) => {
  const llm = getLLMInstance();

  /**
   * TODO: Max 50 history, so trim off any exceeding 50.
   */

  const memory = await createPersistentMemory(sessionId);

  const messages = await memory.chatHistory.getMessages();
  console.log('🔍 Retrieved Messages from DB:', JSON.stringify(messages, null, 2));
  
  const chain = new ConversationChain({ llm, memory });
  const response = await chain.invoke({ input });

  return response;
};
