import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware';
import memberControllers from '../controllers/workspace-members.controllers';
import validate from '../validations';
import { EmailMemberInput } from '../validations/workspace-member.validations';

const router = Router();

router.get('/workspace/:id', isAuth, memberControllers.getMembers);
router.post('/email', isAuth, validate(EmailMemberInput), memberControllers.emailMember);

export default router;
