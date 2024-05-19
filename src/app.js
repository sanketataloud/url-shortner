/**
 * Main App File 
 * @author Sanket Agrawal
 */

import express from 'express';
import { connectDatabase } from './config/db.js';
import { Logger } from './config/logger.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import {swaggerSpec} from './swagger/swagger-config.js';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.js'

const logger = Logger(fileURLToPath(import.meta.url))

connectDatabase();

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.options('*',cors());
app.use(compression());

app.use(morgan(
  'combined',
  {
    write(message) {
      logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
    skip() {
      return process.env.NODE_ENV === 'test';
    },
  },
));

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer : true
}));

app.use('/',routes);

export default app;