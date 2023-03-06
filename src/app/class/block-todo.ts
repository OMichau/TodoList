import { FilterMod } from './filter_mod';
import { Todo } from './todo';

export class BlockTodo {
  id: number;
  title: string = 'todos';
  todos_list: Todo[] = [];
  active_filter: FilterMod = FilterMod.All;
  next_id_todo = 0;

  constructor(id: number) {
    this.id = id;
  }
}
