import { app } from './app.js';
import { env } from './config/env.js';
import { prisma } from './db/prisma.js';


const server = app.listen(env.port, () => {
  console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
});

let isShuttingDown = false;

async function shutdown(signal: string) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.log(`${signal} received. Starting graceful shutdown...`);

  server.close(async (error) => {
    if (error) {
      console.error('Error while closing HTTP server:', error);
      process.exit(1);
    }

    try {
      await prisma.$disconnect();
      console.log('Prisma disconnected successfully.');
      console.log('Graceful shutdown completed.');

      process.exit(0);
    } catch (disconnectError) {
      console.error('Failed to disconnect Prisma:', disconnectError);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10_000).unref();
}

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});
