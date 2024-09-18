import {
  decryptValue,
  encryptValue,
  decryptDocument,
  encryptDocument,
  createBlindIndex,
} from '@grials/medical_system_crypto';
import { ENABLED_ENCRYPT } from '../../config/constants';

export const encryptPractitionerUserDoc = (doc, key) => {
  const newDoc = { ...doc };
  if (ENABLED_ENCRYPT) {
    if (newDoc?.practitionerProfile) {
      newDoc.practitionerProfile = {
        ...encryptDocument(key, newDoc.practitionerProfile),
        idx: createBlindIndex(key, newDoc.practitionerProfile),
      };
    }
    if (newDoc?.password) {
      newDoc.password = encryptValue(key, newDoc.password);
    }
    if (newDoc?.email) {
      newDoc.email = encryptValue(key, newDoc.email);
    }
    if (newDoc?.username) {
      newDoc.username = encryptValue(key, newDoc.username);
    }
  }

  return newDoc;
};

export const decryptPractitionerUserDoc = (doc, key) => {
  const newDoc = { ...doc };
  if (ENABLED_ENCRYPT) {
    if (newDoc.practitionerProfile) {
      newDoc.practitionerProfile = {
        ...decryptDocument(key, newDoc.practitionerProfile),
      };
    }
    if (newDoc?.password) {
      newDoc.password = decryptValue(key, newDoc.password);
    }
    if (newDoc?.email) {
      newDoc.email = decryptValue(key, newDoc.email);
    }
    if (newDoc?.username) {
      newDoc.username = decryptValue(key, newDoc.username);
    }
  }

  return newDoc;
};
