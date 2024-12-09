import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';

export const getPractitionerUserById = async (req, res) => {
  logger.info('get practitioner user by id | resource');
  const logData = req.headers.logData;
  try {
    const response = await services.getUserById(req.params.id);
    const responseData = logData;

    responseData.message = 'practitioner user found';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
