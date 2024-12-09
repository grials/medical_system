import { practitionerUserSchemaValidator, removeNullAndUndefinedValues } from '@grials/medical_system_models';
import { ajv } from '../..';
import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';

export const updatePractitionerUser = async (req, res) => {
  logger.info('update practitioner user | resource');
  const logData = req.headers.logData;
  try {
    const practitionerUser = removeNullAndUndefinedValues(req.body);
    ajv.validateData(practitionerUserSchemaValidator.$id, practitionerUser);

    const response = await services.updatePractitionerUser(req.params.id, practitionerUser);
    const responseData = logData;

    responseData.message = 'practitioner user updated successfully';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
