import * as consumers from './consumers';
export * from './handler';

export const setKafkaConsumer = async () => consumers.setKafkaConsumer();
