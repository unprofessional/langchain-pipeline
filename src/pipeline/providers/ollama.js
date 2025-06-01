import { ChatOllama } from '@langchain/ollama';
import env from '../../config/env.config.js';

export const getOllamaLLM = () => {
  return new ChatOllama({
    baseUrl: env.OLLAMA_BASE_URL,
    model: env.OLLAMA_MODEL,
    streaming: false,
    keepAlive: -1,
  });
};
