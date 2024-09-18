import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';

export const logout = async (req, res) => {
  logger.info('logout | resource');
  const logData = req.headers.logData;
  try {
    const response = await services.logout(req);
    const responseData = logData;

    responseData.message = 'logout successfully';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
