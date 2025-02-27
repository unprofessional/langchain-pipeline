import initLogger from './utils/winston-logger.js'; // Use the correct logger instance
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { initialize } from 'express-openapi';
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import * as operations from './openapi/operations/index.js';

// Get the logger from initLogger()
const logger = initLogger();

// @ts-ignore
const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const server = express();

const file = fs.readFileSync(path.resolve(dirName, './openapi/apidoc.yml'), 'utf8');
const swaggerDocument = YAML.parse(file);

export default async () => {  
  server.use(cookieParser());
  server.use(express.json());
  server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

  // Middleware for logging requests
  server.use(async (req, res, next) => {
    const { method, path: apiPath } = req;
    logger.http(`>>> Incoming request: ${method} ${apiPath}`);

    const bodyKeys = Object.keys(req.body);
    if (bodyKeys.length !== 0) {
      logger.http(`>>> Body: ${JSON.stringify(req.body)}`);
    }

    next(); // Ensure request continues
  });

  // Health Check route
  server.get('/health-check', (req, res) => {
    logger.info('Health Check');
    res.status(200).send('OK');
  });

  initialize({
    apiDoc: file,
    app: server,
    operations,
    errorMiddleware: function (err, req, res, next) {
      logger.error(`>>> errorMiddleware > err reached! err: ${JSON.stringify(err, null, 2)}`);
      if (err) {
        res.status(400).json({
          status: err.status,
          statusText: 'Bad Request',
          jsonSchemaValidation: true,
          validations: err.validations,
          errors: err.errors,
        });
      } else {
        logger.error(`>>> errorMiddleware > ELSE > err: ${JSON.stringify(err, null, 2)}`);
        next(err);
      }
    },
  });

  server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return server;
};
