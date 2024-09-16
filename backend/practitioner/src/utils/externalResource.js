import httpClient from 'axios';
import logger from '../logger';

export const getExternalResource = async (url, token) => {
  logger.info('get external resource | utils');
  try {
    if (token) {
      return await httpClient.get(`${url}`, { headers: { Authorization: token } });
    }
    return await httpClient.get(`${url}`);
  } catch (error) {
    logger.error(error);
    return error;
  }
};
