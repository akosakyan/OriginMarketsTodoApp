import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { concatMap, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { format } from 'date-fns';

import { TodoCategory, TodoEntityModel } from '../models';
import { TodoService } from '../data-access';
import { CreateTodoDto, UpdateTodoDto } from '../data-access/dto';

export enum CallState {
  Init,
  Loading,
  Loaded,
  Processing,
  Processed,
  Error
}

export interface TodoListFilters {
  category: TodoCategory | null/*all*/;
  searchTerm: string;
}

export interface TodoListState {
  todos: TodoEntityModel[];
  callState: CallState;
  error: Error | null;
  filters: TodoListFilters;
}

export const initialState: TodoListState = {
  todos: [],
  callState: CallState.Init,
  error: null,
  filters: {
    category: null,
    searchTerm: ''
  },
};

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  constructor(private todoService: TodoService, private matSnackBar: MatSnackBar) {
    super(initialState);
    this.state$.subscribe(console.log);
  }

  /**
   * Selectors
   */
  readonly todos$ = this.select((state) => state.todos);
  readonly callState$ = this.select((state) => state.callState);
  readonly error$ = this.select((state) => state.error);
  readonly filters$ = this.select((state) => state.filters);

  /**
   * Composed Selectors
   */
  readonly filtersCategory$ = this.select(this.filters$, (filters) => filters.category);

  readonly filtersSearchTerm$ = this.select(this.filters$, (filters) => filters.searchTerm);

  readonly filteredTodos$ = this.select(this.todos$, this.filters$, (todos, filters) =>
    todos.filter((todo) => {
      if (filters.category && todo.category !== filters.category) {
        return false;
      }

      if (!filters.searchTerm) {
        return true;
      }

      return (
        todo.label.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        todo.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    })
  );

  readonly incompleteTodos$ = this.select(this.filteredTodos$, (filteredTodos) =>
    filteredTodos.filter((todo) => todo.done === false)
  );

  readonly completedTodos$ = this.select(this.filteredTodos$, (filteredTodos) =>
    filteredTodos.filter((todo) => Boolean(todo.done))
  );

  /**
   * Updaters
   */
  readonly setAllTodoEntities = this.updater<TodoEntityModel[]>((state, todos) => ({
    ...state,
    todos
  }));

  readonly addOneTodoEntity = this.updater<TodoEntityModel>((state, todo) => ({
    ...state,
    todos: [...state.todos, todo]
  }));

  readonly updateOneTodoEntity = this.updater<{
    id: TodoEntityModel['id'],
    changes: Partial<Omit<TodoEntityModel, 'id'>>
  }>((state, update) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === update.id) {
        return { ...todo, ...update.changes };
      }
      return todo;
    })
  }));

  readonly removeOneTodoEntity = this.updater<TodoEntityModel['id']>((state, id) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id)
  }));

  readonly setCallState = this.updater<{ callState: CallState; error?: Error | null }>((state, { callState, error }) => ({
    ...state,
    callState,
    error: error ?? null
  }));

  readonly updateFilters = this.updater<Partial<TodoListFilters>>((state, filters) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  }));

  /**
   * Effects
   */
  readonly loadAllTodos = this.effect<void>((origin$) => origin$.pipe(
    tap(() => {
      this.setCallState({ callState: CallState.Loading });
    }),
    switchMap(() => this.todoService.getAll().pipe(
      tapResponse(
        (todos) => {
          this.setAllTodoEntities(todos);
          this.setCallState({ callState: CallState.Loaded });
        },
        (error: HttpErrorResponse) => {
          this.setCallState({ callState: CallState.Error, error });
        },
      )
    ))
  ));

  readonly createTodo = this.effect<CreateTodoDto>(
    (origin$) => origin$.pipe(
      concatMap((createTodoDto) => this.todoService.create(createTodoDto).pipe(
        tapResponse(
          (createdTodo) => {
            this.addOneTodoEntity(createdTodo);
            this.matSnackBar.open('Todo successfully created!', 'ok');
          },
          (error: HttpErrorResponse) => {
            this.matSnackBar.open('Something went wrong!', 'ok');
          },
        )
      ))
    )
  );

  readonly updateTodo = this.effect<{ id: TodoEntityModel['id']; updateTodoDto: UpdateTodoDto }>(
    (origin$) => origin$.pipe(
      concatMap(({ id, updateTodoDto }) => this.todoService.update(id, updateTodoDto).pipe(
        tapResponse(
          (updatedTodo) => {
            this.updateOneTodoEntity({ id, changes: updatedTodo });
            this.matSnackBar.open('Todo successfully updated!', 'ok');
          },
          (error: HttpErrorResponse) => {
            this.matSnackBar.open('Something went wrong!', 'ok');
          },
        )
      ))
    )
  );

  readonly deleteTodo = this.effect<TodoEntityModel['id']>(
    (origin$) => origin$.pipe(
      concatMap((id) => this.todoService.delete(id).pipe(
        tapResponse(
          () => {
            this.removeOneTodoEntity(id);
            this.matSnackBar.open('Todo successfully deleted!', 'ok');
          },
          (error: HttpErrorResponse) => {
            this.matSnackBar.open('Something went wrong!', 'ok');
          },
        )
      ))
    )
  );

  readonly markTodoAsDone = this.effect<TodoEntityModel['id']>((origin$) => origin$.pipe(
    concatMap((id) => this.todoService.update(id, { done: format(new Date(), 'dd-MM-yyyy') }).pipe(
      tapResponse(
        () => {
          this.updateOneTodoEntity({ id, changes: { done: true } });
          this.matSnackBar.open('Todo successfully resolved!', 'ok');
        },
        (error: HttpErrorResponse) => {
          this.matSnackBar.open('Something went wrong!', 'ok');
        },
      )
    ))
  ));
}
