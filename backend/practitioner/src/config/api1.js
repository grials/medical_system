import express from 'express';
import mung from 'express-mung';
import { ENABLED_ENCRYPT } from './constants';
import { headerValidator } from '../filters/headerValidator';
import { licenseValidator } from '../filters/licenseValidator';
import defualtRouter from '../routers/defaultRoute';
const apiAppV1 = express();

export const decryptInterceptor = mung.json((body, req, res) => {
  const { licenseKey, path } = req.headers.logData;
  let data = body?.data || null;

  let decryptDoc = null;

  switch (getBasePath(path)) {
    default:
      break;
  }

  if (decryptDoc && data) {
    if (Array.isArray(data)) {
      const cryptoKey = data?.licenseKey || licenseKey;
      return {
        ...body,
        data: data.map((doc) => (cryptoKey ? decryptDoc(doc, cryptoKey) : doc)),
      };
    } else if (data?.docs) {
      return {
        ...body,
        data: {
          ...data,
          docs: data?.docs.map((doc) => {
            const cryptoKey = data?.licenseKey || licenseKey;
            return cryptoKey ? decryptDoc(doc, cryptoKey) : doc;
          }),
        },
      };
    } else {
      const cryptoKey = data?.licenseKey || licenseKey;
      return {
        ...body,
        data: cryptoKey ? decryptDoc(data, cryptoKey) : data,
      };
    }
  }
  return body;
});

export const encryptInterceptor = async (req, res, next) => {
  try {
    const { licenseKey, method, path } = req.headers.logData;
    let encryptDoc = null;

    switch (getBasePath(path)) {
      default:
        break;
    }


    if (encryptDoc) {
      if (method === 'POST' || method === 'PATCH') {
        const cryptoKey = req.body?.licenseKey || licenseKey;
        if (Array.isArray(req.body)) {
          req.body = req.body.map((item) => encryptDoc(item, cryptoKey));
        } else {
          req.body = encryptDoc(req.body, cryptoKey);
          console.log(req.body.patient.name);
        }
      }
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

if (ENABLED_ENCRYPT) {
  apiAppV1.use(encryptInterceptor).use(decryptInterceptor);
}

apiAppV1.use(licenseValidator);
apiAppV1.use(headerValidator);
apiAppV1.use('/default', defualtRouter);

export const v1_0 = apiAppV1;
