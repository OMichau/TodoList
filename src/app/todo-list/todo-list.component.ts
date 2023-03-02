import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BlockTodo } from '../class/block-todo';
import { FilterMod } from '../class/filter_mod';
import { Todo } from '../class/todo';
import { UpdateBlockTodo } from '../class/update-block-todo';
import { UpdateNameTodo } from '../class/update-name-todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnChanges {
  @Output() updateTodoBlock = new EventEmitter<UpdateBlockTodo>();

  @Input() block_todo = new BlockTodo(0);
  @Input() number_completed_items = 0;

  active_print = FilterMod.All;
  filtered_list: Todo[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['block_todo']) {
      this.filterList();
    }
  }

  addToList(event: Todo) {
    this.block_todo.todos_list.push(event);
    this.updateTodoBlock.emit({
      todo_list_id: this.block_todo.id,
      new_todo_list: this.block_todo.todos_list,
    });
    this.filterList();
  }

  checkAll() {
    let bool = true;
    this.block_todo.todos_list.map((todo) => {
      bool = bool && todo.active;
    });
    this.block_todo.todos_list.map((todo) => {
      todo.active = !bool;
    });
    this.updateTodoBlock.emit({
      todo_list_id: this.block_todo.id,
      new_todo_list: this.block_todo.todos_list,
    });
    this.filterList();
  }

  clear(id: number) {
    this.block_todo.todos_list = this.block_todo.todos_list.filter(
      (todo) => todo.id !== id
    );
    this.updateTodoBlock.emit({
      todo_list_id: this.block_todo.id,
      new_todo_list: this.block_todo.todos_list,
    });
    this.filterList();
  }

  activeTodo(id: number) {
    this.block_todo.todos_list.map((todo) => {
      if (todo.id == id) {
        todo.active = !todo.active;
      }
    });
    this.updateTodoBlock.emit({
      todo_list_id: this.block_todo.id,
      new_todo_list: this.block_todo.todos_list,
    });
    this.filterList();
  }

  changePrint(index: FilterMod) {
    this.active_print = index;
    this.filterList();
  }

  clearCompletedItems() {
    this.block_todo.todos_list = this.block_todo.todos_list.filter(
      (todo) => !todo.active
    );
    this.updateTodoBlock.emit({
      todo_list_id: this.block_todo.id,
      new_todo_list: this.block_todo.todos_list,
    });
    this.filterList();
  }

  changeNameTodo(obj: UpdateNameTodo) {
    this.block_todo.todos_list.map((todo) => {
      if (todo.id === obj.todo_id) {
        todo.value = obj.new_name;
      }
    });
    this.updateTodoBlock.emit({
      todo_list_id: this.block_todo.id,
      new_todo_list: this.block_todo.todos_list,
    });
    this.filterList();
  }

  //Fonctions Utilitaires

  filterList() {
    this.filtered_list = this.block_todo.todos_list.filter((todo) => {
      return (
        this.active_print === FilterMod.All ||
        (!todo.active && this.active_print === FilterMod.Active) ||
        (todo.active && this.active_print === FilterMod.Completed)
      );
    });
  }
}
