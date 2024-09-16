import createError from 'http-errors';
import { MOVED_PERMANENTLY } from 'http-status';
import logger from '../logger';
import respondError from './respondError';

const versionNotFound = (req, res, next) => {
  const logData = {
    language: req.headers['accept-language'],
    appVersion: req.headers['l-api-version'],
  };
  const err = new createError(MOVED_PERMANENTLY, 'not supported');
  return respondError(logger, res, err, logData);
};

export default versionNotFound;
