import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? process.env.PORT : 4000,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  LOG_LEVEL: process.env.LOG_LEVEL,
};
