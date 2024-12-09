import { practitionerUserSchemaValidator, removeNullAndUndefinedValues } from '@grials/medical_system_models';
import { ajv } from '../..';
import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';

export const createPractitionerUser = async (req, res) => {
  logger.info('create practitioner user | resource');
  const logData = req.headers.logData;
  try {
    const practitionerUser = removeNullAndUndefinedValues(req.body);
    ajv.validateData(practitionerUserSchemaValidator.$id, practitionerUser);

    const response = await services.createPractitionerUser(practitionerUser);
    const responseData = logData;

    responseData.message = 'practitionerUser created successfully';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
