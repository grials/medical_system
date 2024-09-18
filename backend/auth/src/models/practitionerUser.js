import { Schema } from 'mongoose';
import { practitionerUserSchemaDefinition } from '@grials/medical_system_models';
import { userModel } from './user';

export const practitionerUserSchema = Schema(practitionerUserSchemaDefinition, { timestamps: true });

export const practitionerUserModel = userModel.discriminator('PractitionerUsers', practitionerUserSchema);
