import { setKafkaConsumer } from './kafka';
import app from './app';
import * as db from './config/db';
import { startSchemasValidators } from '@grials/medical_system_models';
import {
  headersValidationData,
  userQueryListValidationData,
  practitionerUserQueryListValidationData,
  loginSchemaValidator,
} from './validationSchemas';
import { SCHEMAS_NAMES, clientRedis } from './config';

export const ajv = startSchemasValidators(SCHEMAS_NAMES);
ajv.ajv.addSchema(loginSchemaValidator);
ajv.ajv.addSchema(headersValidationData);
ajv.ajv.addSchema(userQueryListValidationData);
ajv.ajv.addSchema(practitionerUserQueryListValidationData);

export const redisClient = clientRedis();

db.connect().then(async () => {
  // Start kafka consumers
  await setKafkaConsumer();
  // Start app
  app;
});
