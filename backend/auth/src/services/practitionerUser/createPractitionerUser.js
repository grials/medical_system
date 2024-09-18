import createError from 'http-errors';
import logger from '../../logger';
import * as daos from '../../daos';

export const createPractitionerUser = async (practitionerUser) => {
  logger.info('create practitioner practitionerUser | service');
  try {
    if (await daos.existPractitionerUserByEmail(practitionerUser.email))
      throw createError(422, '[PEAE001]: practitionerUser email already exists');
    if (await daos.existPractitionerUserByUsername(practitionerUser.username))
      throw createError(422, '[PUAE001]: practitionerUser username already exists');

    for (const { identifierType, value } of practitionerUser.practitionerProfile.identifier) {
      if (await daos.existPractitionerUserByIdentifier(value, identifierType.text))
        throw createError(422, '[PIAE001]: practitionerUser identifier already exists');
    }

    return await daos.createPractitionerUser(practitionerUser);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
