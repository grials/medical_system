import createError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';

export const deactivePractitionerUser = async (practitionerUserId) => {
  logger.info('deactive practitioner user | service');
  try {
    if (!(await daos.getPractitionerUserById(practitionerUserId)))
      throw createError(422, '[PNF001]: practitionerUser not found');

    return await daos.deactivePractitionerUser(practitionerUserId);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
