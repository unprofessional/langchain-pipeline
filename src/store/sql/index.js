/* eslint-disable no-underscore-dangle */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createTableChatMemory = readFileSync(path.resolve(__dirname, './create_table_chat_memory.sql'), 'utf8');
const trimOldest = readFileSync(path.resolve(__dirname, './delete_oldest_msgs_by_session_id.sql'), 'utf8');

export {
  createTableChatMemory,
  trimOldest,
};
