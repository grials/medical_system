import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import logger from '../logger';
import { conditionModel, observationModel } from './models';
require('mongoose-schema-jsonschema')(mongoose);

export const schemaBuilder = (models) => {
  logger.info('Build schemas');
  if (models.length > 0) {
    for (const item of models) {
      const schema = JSON.stringify(item.model.jsonSchema());
      fs.writeFileSync(
        path.resolve('.', `src/validationSchemas/${item.resource}ValidationData.js`),
        `export const ${item.resource}ValidationData = ${schema}`,
        'utf8',
      );
      logger.info(`${item.resource} build ✅`);
    }
  }
};

// Build schema
const models = [
  { model: conditionModel, resource: 'condition' },
  { model: observationModel, resource: 'observation' },
];
schemaBuilder(models);
