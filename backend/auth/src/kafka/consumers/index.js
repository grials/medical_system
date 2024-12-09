import * as auth from './auth';

export const setKafkaConsumer = async () => Promise.all([auth.setKafkaConsumer()]);
