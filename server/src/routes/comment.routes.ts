import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware';
import commentControllers from '../controllers/comment.controller';

const router = Router();

router.post('/issue/:id', isAuth, commentControllers.createComment);
router.get('/issue/:id', isAuth, commentControllers.getComments);
router.delete('/:id', isAuth, commentControllers.deleteComment);

export default router;
