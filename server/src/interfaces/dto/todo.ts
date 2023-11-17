export interface CreateTodoDTO {
  text: string;
  userId: string;
}

export interface UpdateTodoDTO {
  text: string;
  _id: string;
  userId: string;
}

export interface DeleteTodoDTO {
  _id: string;
  userId: string;
}
