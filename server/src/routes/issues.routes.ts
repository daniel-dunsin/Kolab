import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware';
import issueControllers from '../controllers/issue.controllers';

const router = Router();

router.post('/', isAuth, issueControllers.createIssue);
router.get('/workspace/:id', isAuth, issueControllers.getIssues);
router.get('/:id', isAuth, issueControllers.getSingleIssue);
router.delete('/:id', isAuth, issueControllers.deleteIssue);

export default router;
