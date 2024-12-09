import { removeNullAndUndefinedValues, userSchemaValidator } from '@grials/medical_system_models';
import { ajv } from '../..';
import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';
import { practitionerUserQueryListValidationData } from '../../validationSchemas';

export const listPractitionerUser = async (req, res) => {
  logger.info('list practitioner user | resource');
  const logData = req.headers.logData;
  try {
    const query = removeNullAndUndefinedValues(req.body);
    ajv.validateData(practitionerUserQueryListValidationData.$id, query);

    const response = await services.listPractitionerUser(query);
    const responseData = logData;

    responseData.message = 'listed practitioner users successfully';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
