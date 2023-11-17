import { BadRequestError, NotFoundError } from '../constants/errors';
import { CreateTodoDTO, DeleteTodoDTO, UpdateTodoDTO } from '../interfaces/dto/todo';
import { ITodo } from '../interfaces/models/todo.interface';
import Todo from '../models/todo.model';

const getUserTodos = async (userId: string): Promise<ITodo[]> => {
  return await Todo.find({ userId }).populate('userId').sort('-updatedAt');
};

const createTodo = async (data: CreateTodoDTO): Promise<ITodo> => {
  return await Todo.create({ ...data });
};

const updateTodo = async (data: UpdateTodoDTO): Promise<ITodo> => {
  const todo = await Todo.findOne({ _id: data._id });

  if (!todo) throw new NotFoundError('Todo does not exist');
  if (todo.userId.toString() != data.userId.toString()) throw new BadRequestError('This todo does not belong to you');

  todo.text = data.text;

  return await todo.save();
};

const deleteTodo = async (data: DeleteTodoDTO): Promise<void> => {
  const todo = await Todo.findOne({ _id: data._id });

  if (!todo) throw new NotFoundError('Todo does not exist');
  if (todo.userId.toString() != data.userId.toString()) throw new BadRequestError('This todo does not belong to you');

  await todo.deleteOne();
};

const todoService = {
  deleteTodo,
  updateTodo,
  getUserTodos,
  createTodo,
};
export default todoService;
