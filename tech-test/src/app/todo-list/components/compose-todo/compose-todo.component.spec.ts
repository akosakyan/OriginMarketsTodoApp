import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeTodoComponent } from './compose-todo.component';

describe('ComposeTodoComponent', () => {
  let component: ComposeTodoComponent;
  let fixture: ComponentFixture<ComposeTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
