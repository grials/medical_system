import logger from '../../logger';
import * as services from '../../services';
import respondError from '../../utils/respondError';
import respondSuccess from '../../utils/respondSuccess';

export const deactivePractitionerUser = async (req, res) => {
  logger.info('deactive practitioner user | resource');
  const logData = req.headers.logData;
  try {
    const response = await services.deactivePractitionerUser(req.params.id);
    const responseData = logData;

    responseData.message = 'practitioner user created deactived';
    responseData.data = response;
    responseData.status = 'OK';
    return respondSuccess(logger, res, responseData);
  } catch (err) {
    return respondError(logger, res, err, logData);
  }
};
