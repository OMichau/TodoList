import { Todo } from './todo';

export interface UpdateBlockTodo {
  todo_list_id: number;
  new_todo_list: Todo[];
}
