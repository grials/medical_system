import express from 'express';
import mung from 'express-mung';
import { ENABLED_ENCRYPT, ENCRYPTION_KEY } from './constants';
import { headerValidator } from '../filters/headerValidator';
import { interceptorValidator } from '../filters/interceptorValidator';
import { decryptPractitionerUserDoc, decryptUserDoc, encryptPractitionerUserDoc, encryptUserDoc } from '../utils';

import authRouter from '../routers/auth';
import userRouter from '../routers/users';
import practitionerUserRouter from '../routers/practitionerUser';

const apiAppV1 = express();

const getBasePath = (path) => path.split('/').filter((item) => item)[0];

export const encryptInterceptor = async (req, res, next) => {
  try {
    const { method, path } = req.headers.logData;
    let encryptDoc = null;

    switch (getBasePath(path)) {
      case 'users':
        encryptDoc = encryptUserDoc;
        break;
      case 'practitioner-users':
        encryptDoc = encryptPractitionerUserDoc;
        break;
      default:
        break;
    }

    if (encryptDoc) {
      if (method === 'POST' || method === 'PATCH') {
        if (Array.isArray(req.body)) {
          req.body = req.body.map((item) => encryptDoc(item, ENCRYPTION_KEY));
        } else {
          req.body = encryptDoc(req.body, ENCRYPTION_KEY);
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const decryptInterceptor = mung.json((body, req, res) => {
  const { path } = req.headers.logData;
  let data = body?.data || null;

  let decryptDoc = null;

  switch (getBasePath(path)) {
    case 'users':
      decryptDoc = decryptUserDoc;
      break;
    case 'practitioner-users':
      decryptDoc = decryptPractitionerUserDoc;
      break;
    default:
      break;
  }

  if (decryptDoc && data) {
    if (Array.isArray(data)) {
      return {
        ...body,
        data: data.map((doc) => (ENCRYPTION_KEY ? decryptDoc(doc, ENCRYPTION_KEY) : doc)),
      };
    } else if (data?.docs) {
      return {
        ...body,
        data: {
          ...data,
          docs: data?.docs.map((doc) => {
            return ENCRYPTION_KEY ? decryptDoc(doc, ENCRYPTION_KEY) : doc;
          }),
        },
      };
    } else {
      return {
        ...body,
        data: ENCRYPTION_KEY ? decryptDoc(data, ENCRYPTION_KEY) : data,
      };
    }
  }
  return body;
});

apiAppV1.use(interceptorValidator);
apiAppV1.use(headerValidator);

if (ENABLED_ENCRYPT) {
  apiAppV1.use(encryptInterceptor).use(decryptInterceptor);
}

apiAppV1.use('/auth', authRouter).use('/users', userRouter).use('/practitioner-users', practitionerUserRouter);

export const v1_0 = apiAppV1;
