import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListFiltersComponent } from './todo-list-filters.component';

describe('TodoListFiltersComponent', () => {
  let component: TodoListFiltersComponent;
  let fixture: ComponentFixture<TodoListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
