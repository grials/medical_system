import { removeNullAndUndefinedValues } from '@grials/medical_system_models';
import { ajv } from '../..';
import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';
import { loginSchemaValidator } from '../../validationSchemas';

export const login = async (req, res) => {
  logger.info('login | resource');
  const logData = req.headers.logData;
  try {
    const login = removeNullAndUndefinedValues(req.body);
    ajv.validateData(loginSchemaValidator.$id, login);

    const response = await services.login(login);
    const responseData = logData;

    responseData.message = 'login successfully';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
