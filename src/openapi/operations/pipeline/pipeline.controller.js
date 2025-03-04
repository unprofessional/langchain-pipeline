import { BufferMemory } from 'langchain/memory';
import { runPipelineWithMemory } from '../../../pipeline/pipeline.js';
import initLogger from '../../../utils/winston-logger.js';

const logger = initLogger();
const memory = new BufferMemory();

export async function pipelineControllerFn(req, res) {
  logger.info('Pipeline Controller reached');

  const body = req.body;
  const userInput = body.prompt;
  let response = {};
  
  try {
    // response = await runPipeline(userInput);
    response = await runPipelineWithMemory(userInput, memory);
    console.log('LLM Response[1]:', response);
  } catch (error) {
    console.error('Error in LLM pipeline:', error);
    res.status(500).end();
  }
  
  res.status(200).json(response);
};
