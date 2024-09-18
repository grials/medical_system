import logger from '../../logger';
import * as daos from '../../daos';

export const getPractitionerUserById = async (practitioneruserId) => {
  logger.info('get practitioner user by id | service');
  try {
    return await daos.getPractitionerUserById(practitioneruserId);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
