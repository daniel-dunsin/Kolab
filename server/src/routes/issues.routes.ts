import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware';
import issueControllers from '../controllers/issue.controllers';
import validate from '../validations';
import { CreateIssueInput } from '../validations/issue.validations';

const router = Router();

router.post('/', isAuth, validate(CreateIssueInput), issueControllers.createIssue);
router.get('/workspace/:id', isAuth, issueControllers.getIssues);
router.get('/:id', isAuth, issueControllers.getSingleIssue);
router.delete('/:id', isAuth, issueControllers.deleteIssue);

export default router;
