import { Component } from '@angular/core';
import { BlockTodo } from '../class/block-todo';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-bock-todo',
  templateUrl: './bock-todo.component.html',
  styleUrls: ['./bock-todo.component.scss'],
})
export class BockTodoComponent {
  block_todo_list: BlockTodo[] = [];
  current_index = 0;

  actual_list = new BlockTodo(0);
  actual_completed_item = 0;
  new_list = true;
  next_id = 1;

  editTitle(event: [number, string]) {
    this.actual_list.title = event[1];
    if (this.new_list) {
      this.new_list = false;
      this.block_todo_list.push(this.actual_list);
    } else {
      const index = this.block_todo_list.findIndex(
        (todos_list) => todos_list.id === event[0]
      );
      this.block_todo_list[index].title = event[1];
    }
  }

  updateList(event: [number, Todo[]]) {
    this.actual_list.todos_list = event[1];
    if (this.new_list) {
      this.block_todo_list.push(this.actual_list);
      this.new_list = false;
    } else {
      const index = this.block_todo_list.findIndex(
        (todos_list) => todos_list.id === event[0]
      );
      this.block_todo_list[index].todos_list = event[1];
    }
    this.countCompletedItems();
  }

  changeList(index: number) {
    if (index < 0) {
      this.new_list = false;
      this.current_index--;
      this.actual_list = this.block_todo_list[this.current_index];
    } else if (this.current_index === this.block_todo_list.length - 1) {
      this.new_list = true;
      this.current_index++;
      this.actual_list = new BlockTodo(this.next_id);
    } else {
      this.current_index++;
      this.new_list = false;
      this.actual_list = this.block_todo_list[this.current_index];
    }
    this.countCompletedItems();
  }

  //Fonctions Utilitaires

  countCompletedItems() {
    this.actual_completed_item = this.actual_list.todos_list.filter(
      (todo) => todo.active
    ).length;
  }
}
