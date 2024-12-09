import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';
import { version } from '../package.json';
import { APP_NAME, APP_PORT } from './config';
import { v1_0 } from './config/api1';
import { dbHealth } from './config/db';
import { interceptorValidator } from './filters/interceptorValidator';
import logger from './logger';
import sendBlankPage from './resources/serverVerification/sendBlankPage';
import { swaggerJsDocs } from './swagger';
import splitVersion from './utils/splitVersion';
import versionNotFound from './utils/versionNotFound';

const routesVersioning = require('express-routes-versioning')();
const app = express();
const router = Router();

// Call middlewares
app.use(
  cors({
    allowedHeaders: 'origin, content-type, accept, authorization',
  }),
);
app.use(express.json({ limit: '50MB' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(morgan('combined', { stream: logger.stream }));

// Health check
app.use('/health', (req, res) =>
  dbHealth() ? res.status(200).send({ status: 'UP' }) : res.status(422).send({ status: 'UNHEALTHY' }),
);

// Swagger
app.use(`/${APP_NAME}/defaults-docs`, serve, setup(swaggerJsDocs));

// Set license validator
app.use(interceptorValidator);

// Routers
app.use(router);

router.use((req, res, next) => {
  req.version = splitVersion(req.headers['l-api-version']);
  logger.info(`version ${req.version}`);
  next();
});

// Api
app.use(
  `/${APP_NAME}/api`,
  routesVersioning(
    {
      '1.0.0': v1_0,
    },
    versionNotFound,
  ),
);

// Blank page
app.use(`/${APP_NAME}/`, sendBlankPage);

// Server listener
app.listen(APP_PORT, () => {
  logger.info(`Listen on port ${APP_PORT} - version ${version}`);
});

export default app;
