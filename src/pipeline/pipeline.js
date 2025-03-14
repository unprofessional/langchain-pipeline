import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import { createPersistentMemory } from '../services/conversation.service.js';
import env from '../config/env.config.js';
import { getOllamaLLM } from './providers/ollama.js';
import { getOpenAILLM } from './providers/openai.js';

// NOTE: This is strictly in-memory and memories/convos do not survive app restarts!
const memory = new BufferMemory();

export const getLLMInstance = () => {
  if (env.MODEL_PROVIDER === 'openai') {
    console.log('>>> Using OpenAI as LLM provider...');
    return getOpenAILLM();
  }
  console.log('>>> Using Ollama as LLM provider...');
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

  // TODO: Max 50 history, so trim off any exceeding 50.
  const memory = await createPersistentMemory(sessionId);

  // If you want to retrieve
  // const messages = await memory.chatHistory.getMessages();
  
  const chain = new ConversationChain({ llm, memory });
  const response = await chain.invoke({ input });

  return response;
};
