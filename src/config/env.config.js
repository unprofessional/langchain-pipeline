import dotenv from 'dotenv';

dotenv.config(); // Load .env first
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// tiny wrapper with default env vars
export default {
  // Basic Project
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3030,
  JWT_SECRET: process.env.JWT_SECRET || 'changemeinprod',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '30d',
  // Pipeline
  MODEL_PROVIDER: process.env.MODEL_PROVIDER || 'ollama',
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  // Postgres
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_PORT: process.env.PG_PORT || '5432',
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASS: process.env.PG_PASS || 'changeme',
  PG_DB: process.env.PG_DB || 'kokoro_pipeline',
  PG_CONNECTION_STR: `postgresql://${process.env.PG_USER}:${process.env.PG_PASS}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`,
};
