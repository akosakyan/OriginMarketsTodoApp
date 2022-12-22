import { TodoEntityModel } from '../../models';

export interface UpdateTodoDto extends Partial<Pick<
  TodoEntityModel,
  'label' | 'description' | 'category' | 'done'
>> {}
