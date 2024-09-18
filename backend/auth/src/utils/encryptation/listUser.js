import { encryptValue } from '@grials/medical_system_crypto';
import { ENABLED_ENCRYPT } from '../../config/constants';

export const encryptListUserDoc = (doc, key) => {
  const newDoc = { ...doc };
  if (ENABLED_ENCRYPT) {
    if (newDoc?.filter?.email) {
      newDoc.filter.email = encryptValue(key, newDoc.filter.email);
    }
    if (newDoc?.filter?.username) {
      newDoc.filter.username = encryptValue(key, newDoc.filter.username);
    }
  }

  return newDoc;
};
