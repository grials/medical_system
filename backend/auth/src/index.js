import { setKafkaConsumer } from './kafka';
import app from './app';
import * as db from './config/db';
import { startSchemasValidators } from '@grials/medical_system_models';
import { headersValidationData } from './validationSchemas/headersValidationData';
import { SCHEMAS_NAMES, clientRedis } from './config';

export const ajv = startSchemasValidators(SCHEMAS_NAMES);
ajv.ajv.addSchema(headersValidationData);

export const redis = clientRedis();

db.connect().then(() => {
  // Start kafka consumers
  setKafkaConsumer();
  // Start app
  app;
});
