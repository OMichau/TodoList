import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePrintComponent } from './choice-print.component';

describe('ChoicePrintComponent', () => {
  let component: ChoicePrintComponent;
  let fixture: ComponentFixture<ChoicePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoicePrintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
