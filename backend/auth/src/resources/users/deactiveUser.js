import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';

export const deactiveUser = async (req, res) => {
  logger.info('deactive user | resource');
  const logData = req.headers.logData;
  try {
    const response = await services.deactiveUser(req.params.id);
    const responseData = logData;

    responseData.message = 'user created deactived';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
