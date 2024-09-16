import createError from 'http-errors';
import { jwtDecode } from 'jwt-decode';
import logger from '../logger';
import respondError from '../utils/respondError';

const setLicenseKeyList = (query, licenseKey) => {
  const newFilter = query.filter
    ? (query.filter += licenseKey ? ` AND licenseKey:eq:${licenseKey}` : '')
    : `licenseKey:eq:${licenseKey}`;
  return licenseKey !== undefined ? Object.assign(query, { filter: newFilter }) : query;
};

const setLicenseKeySave = (req, userData) =>
  Object.assign(req.body, { licenseKey: req.headers['licenseKey'], _user: userData });
export const licenseValidator = async (req, res, next) => {
  logger.info('license validator');
  try {
    const authorization = req.headers['authorization'];

    if (authorization) {
      const [bearer, token] = authorization.split(' ');
      if (bearer === 'Bearer') {
        const payload = jwtDecode(token);
        req.headers['licenseKey'] = payload.licenseKey;

        if (payload.licenseStatus === 'cancelled' && req.method !== 'GET') throw '403';

        if (req.method === 'POST' || req.method === 'PATCH') {
          req = setLicenseKeySave(req, {
            userId: payload?._id,
            email: payload?.email,
            date: new Date(),
          });
        }
        if (req.method === 'GET') req.query = setLicenseKeyList(req.query, payload.licenseKey);
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
