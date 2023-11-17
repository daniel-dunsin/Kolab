import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware';
import validate from '../validations';
import { TodoInput } from '../validations/todo.validations';
import todoControllers from '../controllers/todo.controllers';

const router = Router();

router
  .route('/')
  .get(isAuth, todoControllers.getUserTodos)
  .post(isAuth, validate(TodoInput), todoControllers.createTodo);

router
  .route('/:id')
  .put(isAuth, validate(TodoInput), todoControllers.updateTodo)
  .delete(isAuth, todoControllers.deleteTodo);

export default router;
