/* eslint-disable no-underscore-dangle */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const trimOldest = readFileSync(path.resolve(__dirname, '../store/sql/delete_oldest_msgs_by_session_id.sql'), 'utf8');

export {
  trimOldest,
};
