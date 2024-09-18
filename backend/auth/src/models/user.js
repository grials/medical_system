import { model, Schema } from 'mongoose';
import { userSchemaDefinition } from '@grials/medical_system_models';
import { interceptorMongoDocument } from '../utils';
import { handleKafkaProducer } from '../kafka/handler';
import mongoosePaginate from 'mongoose-paginate-v2';

export const userSchema = Schema(userSchemaDefinition, { timestamps: true });

userSchema.plugin(mongoosePaginate);

userSchema.pre('updateOne', interceptorMongoDocument);
userSchema.pre('deleteOne', interceptorMongoDocument);
userSchema.pre('findOneAndUpdate', interceptorMongoDocument);
userSchema.pre('findOneAndDelete', interceptorMongoDocument);

userSchema.post('save', handleKafkaProducer('user-insert'));
userSchema.post('insertMany', handleKafkaProducer('user-insert'));
userSchema.post('updateMany', handleKafkaProducer('user-update'));
userSchema.post('updateOne', handleKafkaProducer('user-update'));
userSchema.post('findOneAndUpdate', handleKafkaProducer('user-update'));
userSchema.post('findOneAndDelete', handleKafkaProducer('user-delete'));
userSchema.post('deleteMany', handleKafkaProducer('user-delete'));
userSchema.post('deleteOne', handleKafkaProducer('user-delete'));

export const userModel = model('Users', userSchema);
