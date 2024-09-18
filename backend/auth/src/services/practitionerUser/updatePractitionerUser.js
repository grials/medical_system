import createError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';

export const updatePractitionerUser = async (practitionerUserId, practitionerUser) => {
  logger.info('update practitioner practitionerUser | service');
  try {
    if (await daos.existPractitionerUserByEmail(practitionerUser.email, practitionerUserId))
      throw createError(422, '[PEAE001]: practitionerUser email already exists');
    if (await daos.existPractitionerUserByUsername(practitionerUser.username, practitionerUserId))
      throw createError(422, '[PUAE001]: practitionerUser username already exists');

    for (const { identifierType, value } of practitionerUser.practitionerProfile.identifier) {
      if (await daos.existPractitionerUserByIdentifier(value, identifierType.text, practitionerUserId))
        throw createError(422, '[PIAE001]: practitionerUser identifier already exists');
    }

    return await daos.updateUser(practitionerUserId, practitionerUser);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
