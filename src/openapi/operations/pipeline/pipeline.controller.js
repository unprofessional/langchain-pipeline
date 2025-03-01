import initLogger from '../../../utils/winston-logger.js';

const logger = initLogger();

export async function pipelineControllerFn(req, res) {
  logger.info('Pipeline Controller reached');
  res.status(200).end();
};
