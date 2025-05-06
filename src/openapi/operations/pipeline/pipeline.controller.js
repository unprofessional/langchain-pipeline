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
    // response = await runPipeline(userInput); // one-off
    // response = await runPipelineWithBufferMemory(userInput); // in-memory convo history
    response = await runPipelineWithPersistence(userInput, sessionId); // postgres backed convo history

    logger.info(`>>> pipeline.controller > trimOldestMsgsBySessionId > response: ${JSON.stringify(response, null, 2)}`);
  } catch (error) {
    logger.error(`>>> pipeline.controller > trimOldestMsgsBySessionId > response: ${JSON.stringify(error, null, 2)}`);
    return res.status(500).end();
  }
  
  return res.status(200).json(response);
};
