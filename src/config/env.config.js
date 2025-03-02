import dotenv from 'dotenv';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFilePath });

// tiny wrapper with default env vars
export default {
  // Basic Project
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3030,
  JWT_SECRET: process.env.JWT_SECRET || 'changemeinprod',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '30d',
  // Pipeline
  MODEL_PROVIDER: process.env.MODEL_PROVIDER || 'ollama',
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || 'http://192.168.7.73:11434',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  // Postgres
  PG_HOST: process.env.PG_HOST,
  PG_PORT: process.env.PG_PORT,
  PG_USER: process.env.PG_USER,
  PG_PASS: process.env.PG_PASS,
  PG_DB: process.env.PG_DB,
};
