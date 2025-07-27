import * as winston from 'winston';
import { readableDate } from '../date/generate-readable.date';
import { saveLogsLocation } from '../location/logger.location';
/**
 * connectionErrorLogger - Logs errors to file - logs/connection/connection.error.log
 * @returns {winston.Logger} - Returns a winston logger
 */
export const connectionErrorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize(),
  ),
  defaultMeta: {
    service: 'excoadmin-main',
    file: 'src/main.ts',
    time: readableDate(new Date()),
  },
  transports: [
    new winston.transports.File({
      filename: 'connection.error.log',
      dirname: `${saveLogsLocation}/connection`,
    }),
  ],
});

/**
 * connectionInfoLogger - Logs info to file - logs/connection/connection.info.log
 *
 * @returns {winston.Logger} - Returns a winston logger
 */
export const connectionInfoLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize(),
  ),
  defaultMeta: {
    service: 'excoadmin-main',
    file: 'src/main.ts',
    time: readableDate(new Date()),
  },
  transports: [
    new winston.transports.File({
      filename: 'connection.info.log',
      dirname: `${saveLogsLocation}/connection`,
    }),
  ],
});

/**
 * connectionWarnLogger - Logs warn to file - logs/connection/connection.warn.log
 *
 * @returns {winston.Logger} - Returns a winston logger
 */
export const connectionWarnLogger = winston.createLogger({
  level: 'warn',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize(),
  ),
  defaultMeta: {
    service: 'excoadmin-main',
    file: 'src/main.ts',
    time: readableDate(new Date()),
  },
  transports: [
    new winston.transports.File({
      filename: 'connection.warn.log',
      dirname: `${saveLogsLocation}/connection`,
    }),
  ],
});
