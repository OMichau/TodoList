import { TestBed } from '@angular/core/testing';

import { BlockTodoService } from './block-todo.service';

describe('BlockTodoService', () => {
  let service: BlockTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
