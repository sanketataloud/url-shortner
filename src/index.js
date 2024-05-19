import app from './app.js';
import config from './config/config.js';
import { Logger } from './config/logger.js';
import stoppable from 'stoppable';
import {fileURLToPath} from 'url';
import chalk from 'chalk';
import { gracefulShutdown } from './utils/graceful-shutdown.js';

const PORT = config.APP_PORT;

const logger = Logger(fileURLToPath(import.meta.url));

const server = app.listen( PORT , () => {
    logger.info(`App running on port ${chalk.greenBright(PORT)}...`);
})

// In case of an error
app.on('error', (appErr, appCtx) => {
    logger.error(`App Error: '${appErr.stack}' on url: '${appCtx.req.url}' with headers: '${appCtx.req.headers}'`);
  });
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', async err => {
    logger.error(chalk.bgRed('UNHANDLED REJECTION! 💥 Shutting down...'));
    logger.error(err.name, err.message);
  
    await gracefulShutdown(stoppable(server));
  });
  
  // Handle uncaught exceptions
  process.on('uncaughtException', async uncaughtExc => {
    // Won't execute
    logger.error(chalk.bgRed('UNCAUGHT EXCEPTION! 💥 Shutting down...'));
    logger.error(`UncaughtException Error: ${uncaughtExc}`);
    logger.error(`UncaughtException Stack: ${JSON.stringify(uncaughtExc.stack)}`);
    await gracefulShutdown(stoppable(server));
  });
  
  // Graceful shutdown on SIGINT and SIGTERM signals
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async () => {
      logger.warn(`Received ${signal} signal. Shutting down...`);
      await gracefulShutdown(server);
    });
  });
  