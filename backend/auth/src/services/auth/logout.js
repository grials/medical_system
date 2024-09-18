import createHttpError from 'http-errors';
import logger from '../../logger';
import { decodeJwt, handleRedisTokenUser } from '../../utils';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

export const logout = async (req) => {
  logger.info('logout | service');
  try {
    const authorization = req.headers['authorization'];

    if (!authorization) throw createHttpError(401, '[U001]: unauthorized');

    const [bearer, token] = authorization.split(' ');
    if (bearer.toLowerCase() !== 'bearer') throw createHttpError(403, '[IT001]: invalid token');
    if (!token) throw createHttpError(403, '[IT002]: invalid token');
    const user = await decodeJwt(token);
    if (!user) throw createHttpError(403, '[IT003]: invalid token');

    await handleRedisTokenUser(user, token, 'delete');

    return { status: 'ok' };
  } catch (error) {
    logger.error(error);

    if (error instanceof TokenExpiredError) {
      throw createHttpError(401, '[THE002]: token has expired');
    } else if (error instanceof NotBeforeError) {
      throw createHttpError(403, '[TINAY003]: token isn`t active yet');
    } else if (error instanceof JsonWebTokenError) {
      throw createHttpError(403, '[IT004]: invalid token');
    }

    throw error;
  }
};
