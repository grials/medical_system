import createError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';

export const getUserById = async (userId) => {
  logger.info('get user by id | service');
  try {
    return await daos.getUserById(userId);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
