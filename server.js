import winston from 'winston';
import openApiExpressServer from './server.js';
import env from './utils/env.config.js';

const logger = winston.loggers.get('default-logger');
const port = env.PORT;

openApiExpressServer()
  .then((server) => {
    server.listen(port, () => {
      // Logging the running port number
      // eslint-disable-next-line no-console
      logger.info(`server is running at port number ${port}`);
    });
  })
  .catch((err) => {
    // Logging an error message
    // eslint-disable-next-line no-console
    logger.error('error: ', err);
  });