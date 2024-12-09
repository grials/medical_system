import { balls } from '../../config/constants';
import kafka, { setTopicEnv } from '../../config/kafka';
import logger from '../../logger';

export const setKafkaConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'defaults-group' });
  await consumer.connect();
  // Usually you should be only listening to updates.
  await consumer.subscribe({ topic: setTopicEnv('defualt-topic') });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger.info(`Listening >> ${balls.yellow} ${topic}`);
      const msg = JSON.parse(message.value.toString());

      switch (topic) {
        case setTopicEnv(topic):
          break;
      }
    },
  });
};
