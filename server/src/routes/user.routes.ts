import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware';
import validate from '../validations';
import { EditProfileInput } from '../validations/user.validations';
import userController from '../controllers/user.controllers';

const router = Router();

router.put('/', isAuth, validate(EditProfileInput), userController.editProfile);

export default router;
