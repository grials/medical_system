import { model, Schema } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const defaultsSchemaDefinitions = {
  licenseKey: { type: String },
  active: { type: Boolean },
};

export const defaultsSchema = Schema(defaultsSchemaDefinitions, { timestamps: true });

defaultsSchema.plugin(mongoosePaginate);

export const defaultsModel = model('Defaults', defaultsSchema);
