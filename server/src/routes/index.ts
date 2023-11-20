import { Router } from 'express';
import auth from './auth.routes';
import workspace from './workspace.routes';
import member from './workspace-members.routes';
import todo from './todo.routes';
import user from './user.routes';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/workspace', workspace);
router.use('/member', member);
router.use('/todo', todo);

export default router;
