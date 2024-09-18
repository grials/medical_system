import { encryptValue } from '@grials/medical_system_crypto';
import { ENABLED_ENCRYPT } from '../../config/constants';

export const encryptLoginDoc = (doc, key) => {
  const newDoc = { ...doc };
  if (ENABLED_ENCRYPT) {
    if (newDoc?.user) {
      newDoc.user = encryptValue(key, newDoc.user);
    }
    if (newDoc?.password) {
      newDoc.password = encryptValue(key, newDoc.password);
    }
  }

  return newDoc;
};
