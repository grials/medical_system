import { Router } from 'express';
import {
  listPractitionerUser,
  createPractitionerUser,
  updatePractitionerUser,
  getPractitionerUserById,
  deactivePractitionerUser,
} from '../resources';

const practitionerUserRouter = Router();

// Main routes
practitionerUserRouter
  .get('/', listPractitionerUser)
  .get('/:id', getPractitionerUserById)
  .post('/', createPractitionerUser)
  .patch('/:id', updatePractitionerUser)
  .patch('/:id/deactive', deactivePractitionerUser)
  .options('/(.*)', (req, res) => res.end());

export default practitionerUserRouter;
