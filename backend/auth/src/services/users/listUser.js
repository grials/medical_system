import createError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';
import { encryptListUserDoc } from '../../utils/encryptation/listUser';
import { ENCRYPTION_KEY } from '../../config';

export const listUser = async (query) => {
  logger.info('list user | service');
  try {
    const newQuery = encryptListUserDoc(query, ENCRYPTION_KEY);
    if (query?.limit && query?.skip) return daos.paginateUsers(newQuery);

    return await daos.listUsers(newQuery);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
