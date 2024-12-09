import { redisClient } from '..';
import { clientRedis, REDIS_TTL } from '../config';

export const handleRedisTokenUser = async (user, token, action = 'create' | 'isLogged' | 'getToken' | 'delete') => {
  const tokenSignature = token?.split('.')[2];
  const keyOne = tokenSignature;
  const keyTwo = user?._id?.toString();

  switch (action) {
    case 'create':
      // Json Web Token
      await redisClient.set(keyOne, token, 'ex', REDIS_TTL);
      // create login flag
      await redisClient.set(keyTwo, 'true', 'ex', REDIS_TTL);
      break;
    case 'isLogged':
      return await redisClient.get(keyTwo);
    case 'getToken':
      return await redisClient.get(keyOne);
    case 'delete':
      await redisClient.del(keyOne);
      await redisClient.del(keyTwo);
      break;
  }
};
