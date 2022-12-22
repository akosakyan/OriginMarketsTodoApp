import { TodoEntityModel, TodoCategory } from '../../models';

export interface ComposeTodoFormValue extends Pick<TodoEntityModel, 'label' | 'description' | 'category'> {}

export interface ComposeTodoFormControlsConfig extends Record<keyof ComposeTodoFormValue, any> {}

export enum ComposeTodoMode {
  Create = 'CREATE',
  Edit = 'EDIT',
}

export interface ComposeTodoDialogData {
  mode: ComposeTodoMode;
  categories: TodoCategory[];
  todoEntity?: TodoEntityModel;
}

// tslint:disable-next-line:no-empty-interface
export interface ComposeTodoDialogResult extends ComposeTodoFormValue {}
