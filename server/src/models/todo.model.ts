import mongoose, { Types } from 'mongoose';
import { ITodo } from '../interfaces/models/todo.interface';
import { Collections } from '../constants/collections';

const TodoSchema = new mongoose.Schema<ITodo>(
  {
    userId: { type: Types.ObjectId, ref: Collections.user, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model(Collections.todo, TodoSchema);
export default Todo;
