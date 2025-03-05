import { ChatOpenAI } from '@langchain/openai';
import env from '../../config/env.config.js';

export const getOpenAILLM = () => {
  return new ChatOpenAI({
    openAIApiKey: env.OPENAI_API_KEY,
    modelName: 'gpt-4', // Change as needed
  });
};
