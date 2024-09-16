import createError from 'http-errors';
import logger from '../logger';

export const defaultService = async () => {
  logger.info('default | service');
  try {
    return {
      success: true,
      message: 'success',
    };
  } catch (error) {
    logger.error(error);
    switch (error) {
      default:
        throw createError(422, 'server error');
    }
  }
};
