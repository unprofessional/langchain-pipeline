CREATE TABLE chat_memory (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  content JSONB NOT NULL
);
