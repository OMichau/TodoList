import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() changeName = new EventEmitter<BlockTodo>();
  @Output() changeList = new EventEmitter<number>();
  @Output() deleteList = new EventEmitter<number>();
  @Output() resetAll = new EventEmitter<void>();

  edit = false;

  editTitle() {
    this.edit = true;
  }

  endEdit(event: any) {
    if (event.target.value !== '') {
      this.block_todo.title = event.target.value;
      this.changeName.emit(this.block_todo);
      this.edit = false;
    }
  }

  switchList(index: number) {
    this.changeList.emit(index);
  }

  delete(id: number) {
    this.deleteList.emit(id);
  }

  reset() {
    this.resetAll.emit();
  }
}
