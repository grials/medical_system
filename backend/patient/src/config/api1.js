import express from 'express';
import mung from 'express-mung';
import { ENABLED_ENCRYPT, ENCRYPTION_KEY } from './constants';
import { headerValidator } from '../filters/headerValidator';
import { interceptorValidator } from '../filters/interceptorValidator';
import defualtRouter from '../routers/defaultRoute';
const apiAppV1 = express();

export const decryptInterceptor = mung.json((body, req, res) => {
  const { path } = req.headers.logData;
  let data = body?.data || null;

  let decryptDoc = null;

  switch (getBasePath(path)) {
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

export const encryptInterceptor = async (req, res, next) => {
  try {
    const { method, path } = req.headers.logData;
    let encryptDoc = null;

    switch (getBasePath(path)) {
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

if (ENABLED_ENCRYPT) {
  apiAppV1.use(encryptInterceptor).use(decryptInterceptor);
}

apiAppV1.use(interceptorValidator);
apiAppV1.use(headerValidator);
apiAppV1.use('/default', defualtRouter);

export const v1_0 = apiAppV1;
