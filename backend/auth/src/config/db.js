import mongoose from 'mongoose';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_PROVIDER,
  DB_SECURE_SOCKET,
  DB_SSL,
  DB_SSL_CA,
  DB_SSL_VALIDATE,
  DB_USERNAME,
} from './constants';

let mongoOptions = {
  dbName: DB_NAME,
  pass: DB_PASSWORD,
  user: DB_USERNAME,
};

if (DB_SECURE_SOCKET) {
  mongoOptions = {
    ...mongoOptions,
    ...{
      ssl: DB_SSL,
      sslValidate: DB_SSL_VALIDATE,
      sslCA: DB_SSL_CA ? [readFileSync(path.resolve(__dirname, DB_SSL_CA))] : undefined,
    },
  };
}

const mongoUri = (provider) => {
  let uri = null;
  switch (provider) {
    case 'mongo':
      uri = `mongodb://${DB_HOST}:${DB_PORT}`;
      break;
    case 'atlas':
      uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
      break;
  }
  return uri;
};

export const connect = async () => {
  await mongoose.connect(mongoUri(DB_PROVIDER), DB_PROVIDER === 'atlas' ? {} : mongoOptions);
};

export const dbHealth = () => (mongoose.connection.readyState === 1 ? true : false);

// Close connection to mongo
export const disconnect = () => mongoose.disconnect();
