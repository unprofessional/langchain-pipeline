import { trimOldestMsgsBySessionId } from '../../../services/conversation.service.js';
import { runPipelineWithPersistence } from '../../../pipeline/pipeline.js';
import initLogger from '../../../utils/winston-logger.js';

const logger = initLogger();

export async function pipelineControllerFn(req, res) {
  logger.info('Pipeline Controller reached');

  // const queryParams = req.params;

  const body = req.body;
  const userInput = body.prompt;
  const sessionId = body.sessionId || '0987654321';

  logger.info(`userInput: ${userInput}`);
  logger.info(`sessionId: ${sessionId}`);

  let response = {};
  
  try {
    // response = await runPipeline(userInput);
    // response = await runPipelineWithBufferMemory(userInput);
    response = await runPipelineWithPersistence(userInput, sessionId);

    const trimResponse = await trimOldestMsgsBySessionId();
    logger.info(`trimResponse: ${trimResponse}`);

    logger.info(`LLM Response: ${response}`);
  } catch (error) {
    logger.info(`error: ${error}`);
    res.status(500).end();
  }
  
  res.status(200).json(response);
};
