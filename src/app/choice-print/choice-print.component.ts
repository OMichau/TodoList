import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-choice-print',
  templateUrl: './choice-print.component.html',
  styleUrls: ['./choice-print.component.scss'],
})
export class ChoicePrintComponent {
  over = false;

  @Input() number_items = 0;
  @Input() completed_items = 0;

  @Output() changePrintEmitter = new EventEmitter<number>();
  @Output() clearCompletedEmitter = new EventEmitter<void>();

  changePrint(index: number) {
    this.changePrintEmitter.emit(index);
  }

  clearCompleted() {
    this.clearCompletedEmitter.emit();
  }
}
