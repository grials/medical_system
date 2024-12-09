import { encryptValue } from '@grials/medical_system_crypto';
import { ENABLED_ENCRYPT } from '../../config/constants';

export const encryptListPractitionerUserDoc = (doc, key) => {
  const newDoc = { ...doc };
  if (ENABLED_ENCRYPT) {
    if (newDoc?.filter?.email) {
      newDoc.filter.email = encryptValue(key, newDoc.filter.email);
    }
    if (newDoc?.filter?.username) {
      newDoc.filter.username = encryptValue(key, newDoc.filter.username);
    }
    if (newDoc?.filter?.identification) {
      newDoc.filter.identification = encryptValue(key, newDoc.filter.identification);
    }
    if (newDoc?.filter?.name) {
      newDoc.filter.name = encryptValue(key, newDoc.filter.name);
    }
    if (newDoc?.filter?.username) {
      newDoc.filter.username = encryptValue(key, newDoc.filter.username);
    }
    if (newDoc?.filter?.lastname) {
      newDoc.filter.lastname = encryptValue(key, newDoc.filter.lastname);
    }
  }

  return newDoc;
};
