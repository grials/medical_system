import axios from 'axios';
import { AjvValidatorError } from '@grials/medical_system_models';
import createError from 'http-errors';
import { INTERNAL_SERVER_ERROR } from 'http-status';

const buildAxiosError = (error) => {
  const { url, method, data } = error?.config || {};
  const { status, statusText, header } = error?.response || {};

  return {
    config: {
      url,
      method,
      data: JSON.parse(data),
    },
    response: {
      status,
      statusText,
      header,
      data: error?.response?.data,
    },
  };
};

const respondError = (logger, res, error, logData, html) => {
  const status = error.status || INTERNAL_SERVER_ERROR;
  let code = '';

  if (axios.isAxiosError(error))
    return res
      .status(422)
      .send({
        message: 'Axios Error',
        data: { ...buildAxiosError(error) },
      })
      .end();

  if (error instanceof AjvValidatorError)
    return res
      .status(error.status)
      .send({
        message: 'Invalid data',
        length: error.errors.length,
        errors: error.errors,
        code: error.code,
      })
      .end();

  if (error.name || error.kind) {
    if (error.name === 'CastError' || error.kind === 'ObjectId') {
      error = createError(400, error.value);
    }
  }

  if (error.code && error.code === 11000) {
    error = createError(409, 'Duplicated key');
  }
  if (status < 500) {
    logger.warn(error).debug(error?.stack);
  } else {
    logger.error(error).debug(error?.stack);
  }

  if (error.toString().match(/\[(.*?)\]/)) {
    code = error.toString().match(/\[(.*?)\]/)[1];
  }
  return res
    .status(status)
    .send(
      html || {
        message: error.toString(),
        code,
      },
    )
    .end();
};
export default respondError;
