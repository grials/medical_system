import { APP_NAME, LOG_LEVEL } from './config/constants';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: LOG_LEVEL,
  format: combine(colorize(), label({ label: APP_NAME }), timestamp(), myFormat),
  transports: [new transports.Console()],
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

export default logger;
