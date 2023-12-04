import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware';
import projectControllers from '../controllers/project.controllers';
import validate from '../validations';
import { CreateProjectInput } from '../validations/project.validations';

const router = Router();

router.post('/workspace/:id', isAuth, validate(CreateProjectInput), projectControllers.createProject);
router.get('/workspace/:id', isAuth, projectControllers.getProjects);
router.delete('/:id', isAuth, projectControllers.deleteProject);

export default router;
