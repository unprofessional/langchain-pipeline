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
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || 'http://192.168.7.73:11434',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  // Postgres
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_PORT: process.env.PG_PORT || '5432',
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASS: process.env.PG_PASS || 'changeme',
  PG_DB: process.env.PG_DB_KOKORO || 'kokoro_pipeline',
  PG_CONNECTION_STR: `postgresql://${process.env.PG_USER}:${process.env.PG_PASS}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`,
  
  // Ollama
  OLLAMA_HOST: process.env.OLLAMA_HOST || '192.168.7.73',
  OLLAMA_PORT: process.env.OLLAMA_PORT || '11434',
  OLLAMA_CHAT_ENDPOINT: process.env.OLLAMA_CHAT_ENDPOINT || 'api/chat',
  OLLAMA_EMBEDDING_ENDPOINT: process.env.OLLAMA_EMBEDDING_ENDPOINT || 'api/embed',
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || 'vanilj/midnight-miqu-70b-v1.5:latest',
  OLLAMA_EMBED_MODEL: process.env.OLLAMA_EMBED_MODEL || 'avr/sfr-embedding-mistral:q4_k_m',
};
