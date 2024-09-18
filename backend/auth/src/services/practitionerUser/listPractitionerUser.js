import logger from '../../logger';
import * as daos from '../../daos';
import { ENCRYPTION_KEY } from '../../config';
import { encryptListPractitionerUserDoc } from '../../utils';

export const listPractitionerUser = async (query) => {
  logger.info('list practitioner user | service');
  try {
    const newQuery = encryptListPractitionerUserDoc(query, ENCRYPTION_KEY);
    if (query?.limit && query?.skip) return daos.paginatePractitionerUsers(newQuery);
    return await daos.listPractitionerUsers(newQuery);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
