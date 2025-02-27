import initLogger from './utils/winston-logger.js';

// Get logger instance from initLogger()
const logger = initLogger();

import openApiExpressServer from './app.js';
import env from './config/env.config.js';

const port = env.PORT;

openApiExpressServer()
  .then((server) => {
    server.listen(port, () => {
      logger.info(`Server is running at port ${port}`);
    });
  })
  .catch((err) => {
    logger.error(`Unhandled error: ${err.stack || JSON.stringify(err, null, 2)}`);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  // @ts-ignore
  logger.error(`Unhandled Promise Rejection: ${err.stack || JSON.stringify(err, null, 2)}`);
});
