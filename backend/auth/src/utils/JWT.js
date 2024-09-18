import { JWT_SECRET } from '../config';
import { sign, verify } from 'jsonwebtoken';

export const decodeJwt = async (token) =>
  new Promise((resolve, reject) =>
    verify(token, JWT_SECRET, {}, (err, decoded) => (err ? reject(err) : resolve(decoded))),
  );

export const signJwt = async (user) =>
  new Promise((resolve, reject) =>
    sign(user, JWT_SECRET, {}, (err, encoded) => (err ? reject(err) : resolve(encoded))),
  );
