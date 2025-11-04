import path from 'path';
import fs from 'fs';
import winston, { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, splat } = format;

/**
 * Niveles personalizados.
 * Nota: en winston los números más bajos representan mayor prioridad.
 */
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    auth: 3,   // nivel específico para eventos de autenticación/autorización
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    auth: 'magenta',
    debug: 'blue',
  },
};

winston.addColors(customLevels.colors);

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_TO_FILE = process.env.LOG_TO_FILE !== 'false'; // por defecto true

// Asegurar directorio de logs
if (LOG_TO_FILE && !fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  splat(),
  printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

const fileFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  splat(),
  printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

const transportList: winston.transport[] = [
  new transports.Console({
    level: LOG_LEVEL,
    format: consoleFormat,
  }),
];

if (LOG_TO_FILE) {
  transportList.push(
    new DailyRotateFile({
      level: LOG_LEVEL,
      filename: path.join(LOG_DIR, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: fileFormat,
    })
  );
}

const logger = winston.createLogger({
  levels: customLevels.levels,
  level: LOG_LEVEL,
  transports: transportList,
  exitOnError: false,
});

// Helper convenience functions
const logAuth = (message: string, meta?: Record<string, unknown>) => {
  // usar logger.log para niveles no estándar en el TS typing si hace falta
  logger.log('auth', message, meta);
};

export default logger;
export { logAuth };