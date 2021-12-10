// import { config } from 'dotenv';
// import path from 'path';
//
// config({
//   path: path.join(__dirname, '../../.env'),
// });
//
// export default {
//   PORT: process.env['PORT'],
//   NODE_ENV: process.env['NODE_ENV'],
//   MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
//   JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
//   AUTH_MODE: process.env['AUTH_MODE'] === 'true',
// };
import path from 'path';
import dotenv from 'dotenv';

const nodeEnv = `${process.env.NODE_ENV}`;

const getEnv = {
  path: path.resolve(__dirname, '..', '..', '.env'),
};

// @ts-ignore
const getEnvs = getEnv[nodeEnv];

dotenv.config({ path: getEnvs });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? process.env.PORT : 4000,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
