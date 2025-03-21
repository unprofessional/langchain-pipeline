import initLogger from './utils/winston-logger.js'; // MUST be initialized first when placed here
import app from './app.js';
import env from './config/env.config.js';

// Get logger instance from initLogger()
const logger = initLogger();

const port = env.PORT;

app()
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
