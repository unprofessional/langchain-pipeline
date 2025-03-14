import { getLLMInstance } from '../pipeline.js';

export const runPrompt = async (input) => {
  const llm = getLLMInstance();

  const response = await llm.invoke(input);
  return response;
};
