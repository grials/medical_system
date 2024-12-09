import { Router } from 'express';
import { createUser, listUser, updateUser, deactiveUser, getUserById } from '../resources';

const userRouter = Router();

// Main routes
userRouter
  .get('/', listUser)
  .get('/:id', getUserById)
  .post('/', createUser)
  .patch('/:id', updateUser)
  .patch('/:id/deactive', deactiveUser)
  .options('/(.*)', (req, res) => res.end());

export default userRouter;
