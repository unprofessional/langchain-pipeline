import { runPipelineWithBufferMemory, runPipelineWithPersistence } from '../../../pipeline/pipeline.js';
import initLogger from '../../../utils/winston-logger.js';

const logger = initLogger();
const sessionId = '0987654321'; // TODO: Get from requestBody

export async function pipelineControllerFn(req, res) {
  logger.info('Pipeline Controller reached');

  const body = req.body;
  const userInput = body.prompt;
  let response = {};
  
  try {
    // response = await runPipeline(userInput);
    // response = await runPipelineWithBufferMemory(userInput);
    response = await runPipelineWithPersistence(userInput, sessionId);
    console.log('LLM Response[1]:', response);
  } catch (error) {
    console.error('Error in LLM pipeline:', error);
    res.status(500).end();
  }
  
  res.status(200).json(response);
};
