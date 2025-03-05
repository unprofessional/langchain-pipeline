import { ConversationChain } from 'langchain/chains';
import { getLLMInstance } from '../pipeline.js';
import { BufferMemory } from 'langchain/memory';

// import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres';

// export const createPersistentMemory = async(sessionId) => {
//   const messageHistory = new PostgresChatMessageHistory({
//     connectionString: `postgresql://${env.PG_USER}:${env.PG_PASS}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DB}`,
//     tableName: 'chat_memory',
//     sessionId, // Each session has its own memory
//   });

//   return new BufferMemory({ chatHistory: messageHistory });
// };

// NOTE: This is strictly in-memory and memories/convos do not survive app restarts!
const memory = new BufferMemory();

export const runPromptWithMemory = async(input, sessionId) => {
  const llm = getLLMInstance();

  // const memory = await createPersistentMemory(sessionId);
  const chain = new ConversationChain({ llm, memory });
  const response = await chain.invoke({ input });

  return response;
};
