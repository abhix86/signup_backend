import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if (process.env.NODE_ENV !== 'production') {
  const envPath = path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}.local`);
  config({ path: envPath });
}


export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_EXPIRES_IN,
  JWT_SECRET
} = process.env;


if (!DB_URI) {
  throw new Error('MONGODB_URI missing in environment variables!');
}
