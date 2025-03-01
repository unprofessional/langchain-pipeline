import fs from 'fs'
import path from 'path'
import winston from 'winston'

// Ensure logs directory exists
const logDir = 'logs'
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

export default function initLogger () {
  // Prevent re-initialization of the logger (singleton)
  if (winston.loggers.has('default-logger')) {
    return winston.loggers.get('default-logger')
  }

  const fileFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' }),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.printf((info) => {
      return JSON.stringify({
        timestamp: info.timestamp,
        level: info.level,
        message: info.message,
        stack: info.stack || undefined
      }, null, 2)
    })
  )

  const transports = [
    new winston.transports.File({
      format: fileFormat,
      filename: path.join(logDir, 'full.log'),
      level: 'info'
    }),
    new winston.transports.File({
      format: fileFormat,
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      format: fileFormat,
      filename: path.join(logDir, 'warn.log'),
      level: 'warn'
    })
  ]

  const logger = winston.loggers.add('default-logger', {
    level: process.env.LOG_LEVEL || 'info',
    defaultMeta: { service: process.env.LOG_SERVICE_NAME || 'default-service' },
    transports
  })

  // Ensure exceptions & rejections are handled
  logger.exceptions.handle(
    new winston.transports.File({ format: fileFormat, filename: path.join(logDir, 'uncaught-exceptions.log') })
  )

  logger.rejections.handle(
    new winston.transports.File({ format: fileFormat, filename: path.join(logDir, 'rejections.log') })
  )

  // Add console transport only in development
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }))
  }

  return logger
}
