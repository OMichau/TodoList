import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BlockTodo } from '../class/block-todo';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() block_todo: BlockTodo = new BlockTodo(0);
  @Input() first_element = true;
  @Input() last_element = true;

  @Output() changeNameEmitter = new EventEmitter<[number, string]>();
  @Output() changeListEmitter = new EventEmitter<number>();

  edit = false;

  editTitle() {
    this.edit = true;
  }

  endEdit(event: any) {
    this.changeNameEmitter.emit([this.block_todo.id, event.target.value]);
    this.edit = false;
  }

  changeList(index: number) {
    this.changeListEmitter.emit(index);
  }
}
