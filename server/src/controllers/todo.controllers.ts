import { NextFunction, Request, Response } from 'express';
import todoService from '../services/todo.service';
import { CreateTodoDTO, UpdateTodoDTO } from '../interfaces/dto/todo';

const getUserTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await todoService.getUserTodos(<string>req.userId);

    res.status(200).json({ message: 'Todo fetched successfully', data });
  } catch (error) {
    return next(error);
  }
};

const createTodo = async (req: Request<{}, {}, CreateTodoDTO>, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;

    const data = await todoService.createTodo({ text, userId: <string>req.userId });

    res.status(201).json({ message: 'Todo created successfully', data });
  } catch (error) {
    return next(error);
  }
};

const updateTodo = async (req: Request<{ id: string }, {}, UpdateTodoDTO>, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;
    const { text } = req.body;

    const data = await todoService.updateTodo({ text, userId: <string>req.userId, _id });

    res.status(200).json({ message: 'Todo fetched successfully', data });
  } catch (error) {
    return next(error);
  }
};

const deleteTodo = async (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;

    await todoService.deleteTodo({ _id, userId: <string>req.userId });

    res.status(200).json({ message: 'Todo deleted successfully', data: null });
  } catch (error) {
    return next(error);
  }
};

const todoControllers = {
  getUserTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
export default todoControllers;
