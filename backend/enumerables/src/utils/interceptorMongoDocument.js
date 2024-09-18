import { handleKafkaProducer } from '../kafka/handler';

export const interceptorMongoDocument = async function (next) {
  try {
    const oldPayload = await this.model.findOne(this.getFilter());
    if (oldPayload) await handleKafkaProducer('audit-log-document-version')(oldPayload);

    const update = this.getUpdate();
    if (update?.__v !== null) {
      delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
      if (update[key] !== null && update[key]?.__v !== null) {
        delete update[key]?.__v;
        if (Object.keys(update[key] || {}).length === 0) {
          delete update[key];
        }
      }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
    next();
  } catch (error) {
    next(error);
  }
};
