import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BlockTodo } from '../class/block-todo';
import { FilterMod } from '../class/filter_mod';
import { Todo } from '../class/todo';
import { UpdateNameTodo } from '../class/update-name-todo';

@Injectable({
  providedIn: 'root',
})
export class BlockTodoService {
  block_todo_list: BlockTodo[] = [];
  current_block_todo = new Subject<BlockTodo>();
  block_todo: BlockTodo = new BlockTodo(0);
  current_index: number = 0;
  actual_completed_item = new Subject<number>();
  new_list = true;
  next_id = 1;

  constructor() {
    this.current_block_todo.next(new BlockTodo(0));
    this.current_block_todo.subscribe((block_todo) => {
      if (this.new_list) {
        this.block_todo_list.push(block_todo);
        this.new_list = false;
      }
      this.actual_completed_item.next(
        block_todo.todos_list.filter((todo) => todo.active).length
      );
      this.block_todo = block_todo;
    });
  }

  updateList(event: BlockTodo) {
    this.current_block_todo.next(event);
    if (!this.new_list) {
      this.block_todo_list.map((todo_list) => {
        if (todo_list.id === event.id) {
          todo_list = event;
        }
      });
    }
  }

  changeList(index: number) {
    if (index < 0) {
      this.new_list = false;
      this.current_index--;
      this.current_block_todo.next(this.block_todo_list[this.current_index]);
    } else if (this.current_index === this.block_todo_list.length - 1) {
      this.current_index++;
      this.current_block_todo.next(new BlockTodo(this.next_id));
      this.new_list = true;
    } else {
      this.current_index++;
      this.new_list = false;
      this.current_block_todo.next(this.block_todo_list[this.current_index]);
    }
  }

  addTodoToList(todo: Todo) {
    this.block_todo.todos_list.unshift(todo);
    this.current_block_todo.next(this.block_todo);
  }

  checkAllCurrentItems() {
    let bool = true;
    this.block_todo.todos_list.map((todo) => {
      bool = bool && todo.active;
    });
    this.block_todo.todos_list.map((todo) => {
      todo.active = !bool;
    });
    this.current_block_todo.next(this.block_todo);
  }

  clearItem(id: number) {
    this.block_todo.todos_list = this.block_todo.todos_list.filter(
      (todo) => todo.id !== id
    );
    this.current_block_todo.next(this.block_todo);
  }

  activeItem(id: number) {
    this.block_todo.todos_list.map((todo) => {
      if (todo.id == id) {
        todo.active = !todo.active;
      }
    });
    this.current_block_todo.next(this.block_todo);
  }

  clearCompletedItems() {
    this.block_todo.todos_list = this.block_todo.todos_list.filter(
      (todo) => !todo.active
    );
    this.current_block_todo.next(this.block_todo);
  }

  changeNameItem(obj: UpdateNameTodo) {
    this.block_todo.todos_list.map((todo) => {
      if (todo.id === obj.todo_id) {
        todo.value = obj.new_name;
      }
    });
    this.current_block_todo.next(this.block_todo);
  }

  changePrint(index: FilterMod) {
    this.block_todo.active_filter = index;
    this.current_block_todo.next(this.block_todo);
  }
}
