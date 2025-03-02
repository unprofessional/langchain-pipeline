import { ChatOllama } from '@langchain/ollama';
import env from '../../config/env.config.js';

export const getOllamaLLM = () => {
  return new ChatOllama({
    baseUrl: env.OLLAMA_BASE_URL,
    model: 'llama3.2-vision:11b', // Change model as needed
  });
};
