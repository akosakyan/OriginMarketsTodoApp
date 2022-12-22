import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TodoListStore } from '../../state';
import { TodoCategory, TodoEntityModel } from '../../models';
import {
  transformComposeTodoFormValueToCreateDto,
  transformComposeTodoFormValueToUpdateDto
} from '../../transformers';
import {
  ComposeTodoComponent,
  ComposeTodoDialogData,
  ComposeTodoDialogResult,
  ComposeTodoMode
} from '../../components/compose-todo';
import { TodoListFiltersChangedEvent } from '../todo-list-filters';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoListStore]
})
export class TodoListPageComponent implements OnInit {
  callState$ = this.store.callState$;
  error$ = this.store.error$;
  filtersCategory$ = this.store.filtersCategory$;
  filtersSearchTerm$ = this.store.filtersSearchTerm$;
  incompleteTodos$ = this.store.incompleteTodos$;
  completedTodos$ = this.store.completedTodos$;

  categories = Object.values<TodoCategory>(TodoCategory);

  todoCategoryMatIconMap: Record<TodoCategory, string> = {
    [TodoCategory.Bureaucracy]: 'alarm',
    [TodoCategory.House]: 'house',
    [TodoCategory.SelfImprovement]: 'self_improvement',
  };

  todoItemsTrackByFn: TrackByFunction<TodoEntityModel> = (index, item) => item.id;

  constructor(
    private store: TodoListStore,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.loadAllTodos();
  }

  onFiltersChanged(event: TodoListFiltersChangedEvent): void {
    this.store.updateFilters(event);
  }

  onAddTodo(): void {
    this.matDialog.open<
      ComposeTodoComponent,
      ComposeTodoDialogData,
      ComposeTodoDialogResult
    >(ComposeTodoComponent, {
      disableClose: true,
      data: {
        mode: ComposeTodoMode.Create,
        categories: Object.values(TodoCategory)
      }
    })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.store.createTodo(transformComposeTodoFormValueToCreateDto(result));
        }
      });
  }

  onEditTodo(todoEntity: TodoEntityModel): void {
    this.matDialog.open<
      ComposeTodoComponent,
      ComposeTodoDialogData,
      ComposeTodoDialogResult
    >(ComposeTodoComponent, {
      disableClose: true,
      data: {
        mode: ComposeTodoMode.Edit,
        categories: Object.values(TodoCategory),
        todoEntity
      }
    })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.store.updateTodo({
            id: todoEntity.id,
            updateTodoDto: transformComposeTodoFormValueToUpdateDto(result)
          });
        }
      });
  }

  onDeleteTodo(id: TodoEntityModel['id']): void {
    // todo: show confirmation dialog
    this.store.deleteTodo(id);
  }

  onMarkTodoAsDone(id: TodoEntityModel['id']): void {
    // todo: show confirmation dialog
    this.store.markTodoAsDone(id);
  }

  onDuplicate(todoEntity: TodoEntityModel): void {
    // todo: nice to have some duplication functionality
  }
}
