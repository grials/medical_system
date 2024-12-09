import createError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';

export const deactiveUser = async (userId) => {
  logger.info('deactive user | service');
  try {
    if (!(await daos.getUserById(userId))) throw createError(422, '[UNF001]: user not found');

    return await daos.deactiveUser(userId);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
