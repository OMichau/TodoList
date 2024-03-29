import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-add-bar',
  templateUrl: './add-bar.component.html',
  styleUrls: ['./add-bar.component.scss'],
})
export class AddBarComponent {
  @Input() nextId = 0;

  @Input() nbItems = 0;
  @Input() completedItems = 0;

  @Output() addToList = new EventEmitter<Todo>();
  @Output() activeAll = new EventEmitter<void>();

  onKeyEnter(event: any) {
    if (event.target.value != '') {
      this.addToList.emit(new Todo(this.nextId, event.target.value));
      event.target.value = '';
    }
  }

  checkAll() {
    this.activeAll.emit();
  }
}
