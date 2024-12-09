import createError from 'http-errors';
import { jwtDecode } from 'jwt-decode';
import logger from '../logger';
import respondError from '../utils/respondError';

const setUserSave = (req, userData) => Object.assign(req.body, { _user: userData });

export const interceptorValidator = async (req, res, next) => {
  logger.info('interceptor validator');
  try {
    const authorization = req.headers['authorization'];

    if (authorization) {
      const [bearer, token] = authorization.split(' ');
      if (bearer === 'Bearer') {
        const payload = jwtDecode(token);

        if (req.method === 'POST' || req.method === 'PATCH') {
          req = setUserSave(req, {
            userId: payload?._id,
            email: payload?.email,
            date: new Date(),
          });
        }
      }
    }

    next();
  } catch (err) {
    if (err.message) {
      return respondError(logger, res, createError(409, `invalid token [AU014]`));
    }
    if (err === 'auth-service-error') {
      return respondError(logger, res, createError(409, `auth service unavailable [CM017]`));
    }
    if (err === 'session-error') {
      return respondError(logger, res, createError(401, `session token expired [AU014]`));
    }
    switch (err) {
      case '403':
        const err = createError(403, `unauthorized access [AU001]`);
        return respondError(logger, res, err);
      default:
        return respondError(logger, res, createError(500, `server error`));
    }
  }
};
