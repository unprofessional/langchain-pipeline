import { runPipelineWithMemory } from '../../../pipeline/pipeline.js';
import initLogger from '../../../utils/winston-logger.js';

const logger = initLogger();

export async function pipelineControllerFn(req, res) {
  logger.info('Pipeline Controller reached');

  const userInput = 'What is the last thing you remember?';
  
  (async() => {
    try {
      // const output = await runPipeline(userInput);
      const output = await runPipelineWithMemory(userInput);
      console.log('LLM Response:', output);
    } catch (error) {
      console.error('Error in LLM pipeline:', error);
    }
  })();
  
  res.status(200).end();
};
