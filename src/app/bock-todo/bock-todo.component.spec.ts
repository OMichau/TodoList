import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BockTodoComponent } from './bock-todo.component';

describe('BockTodoComponent', () => {
  let component: BockTodoComponent;
  let fixture: ComponentFixture<BockTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BockTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BockTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
