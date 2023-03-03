import { Component } from '@angular/core';
import { BlockTodo } from '../class/block-todo';
import { BlockTodoService } from '../service/block-todo.service';

@Component({
  selector: 'app-bock-todo',
  templateUrl: './bock-todo.component.html',
  styleUrls: ['./bock-todo.component.scss'],
})
export class BockTodoComponent {
  actual_list = new BlockTodo(0);
  current_index = 0;
  actual_completed_item = 0;
  block_todo_length = 0;

  constructor(private block_todo_service: BlockTodoService) {
    block_todo_service.current_block_todo.subscribe((block_todo) => {
      this.actual_list = block_todo;
      this.updateVar();
    });
    block_todo_service.actual_completed_item.subscribe((completed_item) => {
      this.actual_completed_item = completed_item;
    });
  }

  editTitle(event: BlockTodo) {
    this.block_todo_service.updateList(event);
  }

  changeList(index: number) {
    this.block_todo_service.changeList(index);
  }

  updateVar() {
    this.current_index = this.block_todo_service.current_index;
    this.block_todo_length = this.block_todo_service.block_todo_list.length;
  }
}
