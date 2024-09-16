'use string';

import kafka, { setTopicEnv } from '../config/kafka';
import logger from '../logger';

export const handleKafkaProducer = (topic) => async (doc) => {
  logger.info(`${topic} | producer 🟣`);
  try {
    const producer = kafka.producer();
    if (producer) {
      await producer.connect();
      await producer.send({
        topic: setTopicEnv(topic),
        messages: [{ value: JSON.stringify(doc) }],
      });
      await producer.disconnect();
    }
  } catch (err) {
    logger.error(err);
  }
};
