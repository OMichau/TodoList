import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo: Todo = new Todo(0, '');

  @Output() clearEmitter = new EventEmitter<number>();
  @Output() activeEmitter = new EventEmitter<number>();
  @Output() changeNameEmitter = new EventEmitter<[string, number]>();

  edit = false;

  changeActive() {
    this.activeEmitter.emit(this.todo.id);
  }

  clear() {
    this.clearEmitter.emit(this.todo.id);
  }

  editTodo() {
    this.edit = true;
  }

  endEdit(event: any) {
    if (event.target.value != '') {
      this.edit = false;
      this.changeNameEmitter.emit([event.target.value, this.todo.id]);
    }
  }
}
