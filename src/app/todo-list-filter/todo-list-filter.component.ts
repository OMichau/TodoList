import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterMod } from '../class/filter_mod';

@Component({
  selector: 'app-todo-list-filter',
  templateUrl: './todo-list-filter.component.html',
  styleUrls: ['./todo-list-filter.component.scss'],
})
export class TodoListFilterComponent {
  filter_mod = FilterMod;
  @Input() active_filter_mod: FilterMod = FilterMod.All;

  @Input() number_items = 0;
  @Input() completed_items = 0;

  @Output() changeFilterMod = new EventEmitter<number>();
  @Output() clearCompleted = new EventEmitter<void>();

  changePrint(index: FilterMod) {
    this.changeFilterMod.emit(index);
  }

  clearCompletedItems() {
    this.clearCompleted.emit();
  }
}
