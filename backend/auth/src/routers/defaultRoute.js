import { Router } from 'express';
import { defaultResource } from '../resources';

const defualtRouter = Router();

// Main routes
defualtRouter.get('/', defaultResource).options('/(.*)', (req, res) => res.end());

export default defualtRouter;
