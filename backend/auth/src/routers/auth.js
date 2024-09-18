import { Router } from 'express';
import { login, logout, validate } from '../resources';

const authRouter = Router();

// Main routes
authRouter
  .get('/logout', logout)
  .get('/validate', validate)
  .post('/login', login)
  .options('/(.*)', (req, res) => res.end());

export default authRouter;
