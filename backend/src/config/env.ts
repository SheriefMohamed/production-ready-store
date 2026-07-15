import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT ?? 4000);

if (Number.isNaN(port)) {
  throw new Error('PORT must be a valid number.');
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required.');
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port,
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
});
