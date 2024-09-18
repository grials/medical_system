import createError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';

export const createUser = async (user) => {
  logger.info('create user | service');
  try {
    if (await daos.existUserByEmail(user.email)) throw createError(422, '[UEAE001]: user email already exists');
    if (await daos.existUserByUsername(user.username))
      throw createError(422, '[UEAE001]: user username already exists');

    return await daos.createUser(user);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
