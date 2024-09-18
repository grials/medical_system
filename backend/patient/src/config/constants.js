export const APP_PORT = process.env.APP_PORT;
export const APP_NAME = 'auth-service';
export const AVAILABLE_VERSIONS = process.env?.AVAILABLE_VERSIONS?.split(',') || ['v1.0.0'];
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const ENVIRONMENT = process.env.ENVIRONMENT.toLowerCase();
export const GATEWAY_URL = `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}`;

// ENCRYPTION
export const ENABLED_ENCRYPT = process.env.ENABLED_ENCRYPT;
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// Kafka
export const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(',');
export const KAFKA_ID = process.env.KAFKA_ID;

export const MIME_TYPES = [
  'image/jpeg',
  'image/gif',
  'image/bmp',
  'image/png',
  'audio/mpeg',
  'audio/ogg',
  'video/mp4',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const languages = ['es', 'en'];

export const INGRESS_HOST = `http://${process.env.INGRESS_HOST}`;

export const FILE_STORAGE = process.env.FILE_STORAGE;

export const balls = {
  red: '🔴',
  orange: '🟠',
  yellow: '🟡',
  green: '🟢',
  blue: '🔵',
  violet: '🟣',
  black: '⚫',
  white: '⚪',
};

export const SCHEMAS_NAMES = [];

// MongoDb
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_PROVIDER = process.env.DB_PROVIDER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_SSL = process.env.DB_SSL?.toLowerCase() === 'true' ? true : false;
export const DB_SSL_CA = process.env.DB_SSL_CA;
export const DB_SSL_VALIDATE = process.env.DB_SSL_VALIDATE?.toLowerCase() === 'true' ? true : false;
export const DB_SECURE_SOCKET = process.env.DB_SECURE_SOCKET?.toLowerCase() === 'true' ? true : false;

// Redis
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
