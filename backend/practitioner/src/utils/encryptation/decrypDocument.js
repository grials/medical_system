import { createBlindIndex, decryptDocument, encryptDocument } from '@grials/medical_system_crypto';
import { ENABLED_ENCRYPT } from '../../config/constants';

export const encryptDoc = (doc, key) => {
  const newDoc = { ...doc };
  if (ENABLED_ENCRYPT) {
    return encryptDocument(key, newDoc);
  }

  return newDoc;
};

export const decryptDoc = (doc, key) => {
  const newDoc = { ...doc };
  if (ENABLED_ENCRYPT) {
    return decryptDocument(key, newDoc);
  }

  return newDoc;
};
