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
  block_string = 'block_todo_list';
  block_todo_list: BlockTodo[];
  current_block_todo = new Subject<BlockTodo>();
  block_todo: BlockTodo;
  current_index: number = 0;
  actual_completed_item = new Subject<number>();
  new_list = true;
  next_id_list = 1;

  undo_list: BlockTodo[][] = [];
  redo_list: BlockTodo[][] = [];

  constructor() {
    //-----------Inititalisation-----------//
    const block_list_string = localStorage.getItem(this.block_string);
    if (block_list_string === null) {
      this.block_todo_list = [];
      this.current_block_todo.next(new BlockTodo(0));
      this.block_todo = new BlockTodo(0);
    } else {
      const block_list = JSON.parse(block_list_string) as BlockTodo[];
      if (block_list.length === 0) {
        this.block_todo_list = [];
        this.current_block_todo.next(new BlockTodo(0));
        this.block_todo = new BlockTodo(0);
      } else {
        this.block_todo_list = block_list;
        this.block_todo = this.block_todo_list[0];
        this.current_block_todo.next(this.block_todo);
        this.new_list = false;
      }
    }
    const next_id_string = localStorage.getItem('next_id_list');
    if (next_id_string === null) {
      this.next_id_list = 0;
    } else {
      this.next_id_list = parseInt(next_id_string);
    }
    //-----------Subcribe-----------//
    this.current_block_todo.subscribe((block_todo) => {
      if (this.new_list) {
        this.block_todo_list.push(block_todo);
        this.new_list = false;
        this.next_id_list++;
        localStorage.setItem('next_id_list', this.next_id_list.toString());
      }
      this.actual_completed_item.next(
        block_todo.todos_list.filter((todo) => todo.active).length
      );
      this.block_todo = block_todo;
      localStorage.setItem(
        this.block_string,
        JSON.stringify(this.block_todo_list)
      );
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
      this.current_block_todo.next(new BlockTodo(this.next_id_list));
      this.new_list = true;
    } else {
      this.current_index++;
      this.new_list = false;
      this.current_block_todo.next(this.block_todo_list[this.current_index]);
    }
  }

  addTodoToList(todo: Todo) {
    this.block_todo.todos_list.unshift(todo);
    this.block_todo.next_id_todo++;
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

  deleteList(id: number) {
    this.block_todo_list = this.block_todo_list.filter(
      (block_todo) => block_todo.id !== id
    );
    if (this.current_index === 0) {
      if (this.block_todo_list.length === 0) {
        this.block_todo = new BlockTodo(this.next_id_list);
        this.current_block_todo.next(this.block_todo);
        this.new_list = true;
      } else {
        this.block_todo = this.block_todo_list[0];
        this.current_block_todo.next(this.block_todo);
      }
    } else {
      this.changeList(-1);
    }
  }

  undo() {
    const temp = this.undo_list.pop();
    console.log(temp);
    if (temp) {
      this.block_todo_list = temp;
      this.block_todo = this.block_todo_list[this.current_index];
      this.current_block_todo.next(this.block_todo);
    }
  }

  reset() {
    this.block_todo = new BlockTodo(0);
    this.block_todo_list = [];
    this.next_id_list = 1;
    this.current_block_todo.next(this.block_todo);
    this.current_index = 0;
    this.actual_completed_item.next(0);
    this.new_list = true;
    localStorage.removeItem(this.block_string);
    localStorage.removeItem('next_id_list');
  }
}
