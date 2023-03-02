import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlockTodo } from '../class/block-todo';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-global-list',
  templateUrl: './global-list.component.html',
  styleUrls: ['./global-list.component.scss'],
})
export class GlobalListComponent {
  @Output() changementEmitter = new EventEmitter<[number, Todo[]]>();

  @Input() block_todo = new BlockTodo(0);

  @Input() number_completed_items = 0;
  active_print = 0; //Choix de ce que l'on affiche (0 => All, 1=> Active, 2=> Completed)

  addToList(event: Todo) {
    this.block_todo.todos_list.push(event);
    this.changementEmitter.emit([
      this.block_todo.id,
      this.block_todo.todos_list,
    ]);
  }

  checkAll() {
    let bool = true;
    this.block_todo.todos_list.forEach((todo, _) => {
      bool = bool && todo.active;
    });
    this.block_todo.todos_list.forEach((todo, _) => {
      todo.active = !bool;
    });
    this.changementEmitter.emit([
      this.block_todo.id,
      this.block_todo.todos_list,
    ]);
  }

  clear(id: number) {
    const temp = this.block_todo.todos_list.findIndex((todo) => todo.id == id);
    this.block_todo.todos_list.splice(temp, 1);
    this.changementEmitter.emit([
      this.block_todo.id,
      this.block_todo.todos_list,
    ]);
  }

  activeTodo(id: number) {
    const temp = this.block_todo.todos_list.findIndex((todo) => todo.id == id);
    this.block_todo.todos_list[temp].active =
      !this.block_todo.todos_list[temp].active;
    this.changementEmitter.emit([
      this.block_todo.id,
      this.block_todo.todos_list,
    ]);
  }

  changePrint(index: number) {
    this.active_print = index;
  }

  clearCompletedItems() {
    let i = 0;
    while (i < this.block_todo.todos_list.length) {
      if (this.block_todo.todos_list[i].active) {
        this.block_todo.todos_list.splice(i, 1);
      } else {
        i++;
      }
    }
    this.changementEmitter.emit([
      this.block_todo.id,
      this.block_todo.todos_list,
    ]);
  }

  changeNameTodo(obj: [string, number]) {
    const temp = this.block_todo.todos_list.findIndex(
      (todo) => todo.id == obj[1]
    );
    this.block_todo.todos_list[temp].value = obj[0];
    this.changementEmitter.emit([
      this.block_todo.id,
      this.block_todo.todos_list,
    ]);
  }

  //Fonctions Utilitaires

  printableItem(todo: Todo) {
    return (
      this.active_print === 0 ||
      (!todo.active && this.active_print === 1) ||
      (todo.active && this.active_print === 2)
    );
  }
}
