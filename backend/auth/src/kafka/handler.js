import kafka, { setTopicEnv } from '../config/kafka';
import logger from '../logger';

export const handleKafkaProducer = (topic) => async (doc) => {
  const newTopic = setTopicEnv(topic);
  logger.info(`${newTopic} | producer 🟣`);
  try {
    const producer = kafka.producer();
    if (producer) {
      await producer.connect();
      await producer.send({
        topic: newTopic,
        messages: [{ value: JSON.stringify(doc) }],
      });
      await producer.disconnect();
    }
  } catch (err) {
    logger.error(err);
  }
};
