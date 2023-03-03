import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../class/todo';
import { UpdateNameTodo } from '../class/update-name-todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo: Todo = new Todo(0, '');

  @Output() clearTodo = new EventEmitter<number>();
  @Output() activeTodo = new EventEmitter<number>();
  @Output() changeName = new EventEmitter<UpdateNameTodo>();

  edit = false;

  changeActive() {
    this.activeTodo.emit(this.todo.id);
  }

  clear() {
    this.clearTodo.emit(this.todo.id);
  }

  editTodo() {
    this.edit = true;
  }

  endEdit(event: any) {
    if (event.target.value != '') {
      this.edit = false;
      this.changeName.emit({
        todo_id: this.todo.id,
        new_name: event.target.value,
      });
    }
  }

  cancelEdit() {
    this.edit = false;
  }
}
