import { Router } from 'express';
import auth from './auth.routes';
import workspace from './workspace.routes';
import member from './workspace-members.routes';

const router = Router();

router.use('/auth', auth);
router.use('/workspace', workspace);
router.use('/member', member);

export default router;
