export class Todo {
  id: number;
  value: string;
  active = false;

  constructor(id: number, value: string) {
    this.id = id;
    this.value = value;
  }
}
