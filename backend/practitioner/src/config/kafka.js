import { ENVIRONMENT, KAFKA_BROKERS, KAFKA_ID } from './constants';

const KafkaJS = require('kafkajs');

console.log({
  brokers: KAFKA_BROKERS,
  clientId: KAFKA_ID,
});
const kafka = new KafkaJS.Kafka({
  brokers: KAFKA_BROKERS,
  clientId: KAFKA_ID,
});

export const setTopicEnv = (topic) => (ENVIRONMENT && ENVIRONMENT !== 'prod' ? `${ENVIRONMENT}-${topic}` : topic);

export default kafka;
