import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import env from '../config/env.config.js';
import { getOllamaLLM } from './providers/ollama.js';
import { getOpenAILLM } from './providers/openai.js';

// import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres';

// NOTE: This is strictly in-memory and memories/convos do not survive app restarts!
const memory = new BufferMemory();

// export const createPersistentMemory = async(sessionId) => {
//   const messageHistory = new PostgresChatMessageHistory({
//     connectionString: `postgresql://${env.PG_USER}:${env.PG_PASS}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DB}`,
//     tableName: 'chat_memory',
//     sessionId, // Each session has its own memory
//   });

//   return new BufferMemory({ chatHistory: messageHistory });
// };

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

export const runPipelineWithMemory = async(input, sessionId) => {
  const llm = getLLMInstance();

  // const memory = await createPersistentMemory(sessionId);
  const chain = new ConversationChain({ llm, memory });
  const response = await chain.invoke({ input });

  return response;
};
