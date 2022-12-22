import { TodoCategory } from './todo-category';

export interface TodoEntityModel {
  id: number;
  label: string;
  description: string;
  category: TodoCategory;
  done: boolean | string;
}
