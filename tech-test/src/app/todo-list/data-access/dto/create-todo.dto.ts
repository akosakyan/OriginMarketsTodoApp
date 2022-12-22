import { TodoEntityModel } from '../../models';

export interface CreateTodoDto extends Pick<
  TodoEntityModel,
  'label' | 'description' | 'category' | 'done'
> {}
