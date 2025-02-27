import dotenv from 'dotenv';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFilePath });

// tiny wrapper with default env vars
export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3030,
  JWT_SECRET: process.env.JWT_SECRET || 'changeMeWithEnvValue',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '30d',
};