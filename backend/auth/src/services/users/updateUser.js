import createError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';

export const updateUser = async (userId, user) => {
  logger.info('update user | service');
  try {
    if (await daos.existUserByEmail(user.email, userId)) throw createError(422, '[UEAE001]: user email already exists');
    if (await daos.existUserByUsername(user.username, userId))
      throw createError(422, '[UEAE001]: user username already exists');

    return await daos.updateUser(userId, user);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
