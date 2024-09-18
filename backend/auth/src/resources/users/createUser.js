import { removeNullAndUndefinedValues, userSchemaValidator } from '@grials/medical_system_models';
import { ajv } from '../..';
import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';

export const createUser = async (req, res) => {
  logger.info('create user | resource');
  const logData = req.headers.logData;
  try {
    const user = removeNullAndUndefinedValues(req.body);
    ajv.validateData(userSchemaValidator.$id, user);

    const response = await services.createUser(user);
    const responseData = logData;

    responseData.message = 'user created successfully';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
