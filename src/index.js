import application from './app.js';

import logConfig from '../config/log.js';
import corsConfig from '../config/cors.js';

import ApplicationLogger from './logger.js';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const logger = new ApplicationLogger(logConfig);
  const app = await application(logger, corsConfig);
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.log('An error occurred while initializing the application.', err);
});

export default class Empty {}