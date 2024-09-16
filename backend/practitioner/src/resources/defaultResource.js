import logger from '../logger';
import * as services from '../services';
import respondError from '../utils/respondError';
import respondSuccess from '../utils/respondSuccess';

export const defaultResource = async (req, res) => {
  logger.info('defualt | resource');
  const logData = req.headers.logData;

  try {
    const responseFile = await services.defaultService();
    const responseData = logData;

    responseData.message = 'successfully';
    responseData.data = responseFile;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
