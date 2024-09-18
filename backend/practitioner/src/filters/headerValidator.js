import respondError from '../utils/respondError';
import { headersValidationData } from '../validationSchemas/headersValidationData';
import logger from '../logger';
import { ajv } from '..';

export const headerValidator = (req, res, next) => {
  let logData = {};
  try {
    ajv.validateData(headersValidationData.$id, req.headers);
  } catch (error) {
    return respondError(logger, res, logData);
  }
  logData = {
    path: req.path,
    method: req.method,
    originalPath: req.originalUrl,
    language: req.headers['accept-language'],
    appVersion: req.headers['l-api-version'],
    
  };

  req.headers.logData = logData;
  next();
};
