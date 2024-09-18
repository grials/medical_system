import createHttpError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';
import { encryptLoginDoc, handleRedisTokenUser, signJwt } from '../../utils';
import { ENCRYPTION_KEY } from '../../config';

export const login = async (payload) => {
  logger.info('login | service');
  try {
    const { user, password } = encryptLoginDoc(payload, ENCRYPTION_KEY);
    const userFound = await daos.findOneUser(
      {
        $and: [
          {
            password: password,
          },
          {
            $or: [
              {
                email: user,
              },
              {
                username: user,
              },
            ],
          },
        ],
      },
      {
        _id: 1,
        type: 1,
      },
    );

    if (!userFound) throw createHttpError(401, '[UNF001]: user not found');

    const isLogged = await handleRedisTokenUser(userFound, null, 'isLogged');
    if (isLogged) throw createHttpError(403, '[UAL003]: user already logged');

    const token = await signJwt(userFound);
    await handleRedisTokenUser(userFound, token, 'create');
    return {
      token,
      user: userFound,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
