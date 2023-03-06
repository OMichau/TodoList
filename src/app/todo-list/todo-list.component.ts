import { Component } from '@angular/core';
import { BlockTodo } from '../class/block-todo';
import { FilterMod } from '../class/filter_mod';
import { Todo } from '../class/todo';
import { UpdateNameTodo } from '../class/update-name-todo';
import { BlockTodoService } from '../service/block-todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  block_todo: BlockTodo;
  number_completed_items = 0;
  filtered_list: Todo[] = [];

  constructor(private block_todo_service: BlockTodoService) {
    this.block_todo = this.block_todo_service.block_todo;
    this.filterList();
    this.block_todo_service.current_block_todo.subscribe((block_todo) => {
      this.block_todo = block_todo;
      this.filterList();
    });
    this.block_todo_service.actual_completed_item.subscribe(
      (completed_item) => {
        this.number_completed_items = completed_item;
      }
    );
  }

  addToList(event: Todo) {
    this.block_todo_service.addTodoToList(event);
    this.filterList();
  }

  checkAll() {
    this.block_todo_service.checkAllCurrentItems();
    this.filterList();
  }

  clear(id: number) {
    this.block_todo_service.clearItem(id);
    this.filterList();
  }

  activeTodo(id: number) {
    this.block_todo_service.activeItem(id);
    this.filterList();
  }

  changePrint(index: FilterMod) {
    this.block_todo_service.changePrint(index);
    this.filterList();
  }

  clearCompletedItems() {
    this.block_todo_service.clearCompletedItems();
    this.filterList();
  }

  changeNameTodo(obj: UpdateNameTodo) {
    this.block_todo_service.changeNameItem(obj);
    this.filterList();
  }

  //Fonctions Utilitaires

  filterList() {
    this.filtered_list = this.block_todo.todos_list.filter((todo) => {
      return (
        this.block_todo.active_filter === FilterMod.All ||
        (!todo.active && this.block_todo.active_filter === FilterMod.Active) ||
        (todo.active && this.block_todo.active_filter === FilterMod.Completed)
      );
    });
  }

  undo() {
    this.block_todo_service.undo();
  }
}
