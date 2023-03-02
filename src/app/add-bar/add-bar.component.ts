import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-add-bar',
  templateUrl: './add-bar.component.html',
  styleUrls: ['./add-bar.component.scss'],
})
export class AddBarComponent {
  nextId = 0;

  @Input() nbItems = 0;
  @Input() completedItems = 0;

  @Output() addToListEmitter = new EventEmitter<Todo>();
  @Output() activeAllEmitter = new EventEmitter<void>();

  onKeyEnter(event: any) {
    if (event.target.value != '') {
      this.addToListEmitter.emit(new Todo(this.nextId, event.target.value));
      this.nextId++;
      event.target.value = '';
    }
  }

  checkAll() {
    this.activeAllEmitter.emit();
  }
}
