import httpStatus from 'http-status';

const respondSuccess = (logger, res, responseData) => {
  logger.info('sending success response');
  const { message, data } = responseData;
  const payload = {
    message: message || '',
    data: data || {},
  };

  return res
    .status(httpStatus[responseData.status])
    .send(responseData.html || payload)
    .end();
};

export default respondSuccess;
