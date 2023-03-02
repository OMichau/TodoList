import { Todo } from './todo';

export class BlockTodo {
  id: number;
  title: string = 'todos';
  todos_list: Todo[] = [];

  constructor(id: number) {
    this.id = id;
  }
}
