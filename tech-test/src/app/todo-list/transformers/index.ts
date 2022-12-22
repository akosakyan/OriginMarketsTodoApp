import { ComposeTodoDialogResult } from '../components/compose-todo';
import { CreateTodoDto, UpdateTodoDto } from '../data-access/dto';

export function transformComposeTodoFormValueToCreateDto(
  composeTodoDialogResult: ComposeTodoDialogResult
): CreateTodoDto {
  return {
    ...composeTodoDialogResult,
    done: false
  };
}

export function transformComposeTodoFormValueToUpdateDto(
  composeTodoDialogResult: ComposeTodoDialogResult
): UpdateTodoDto {
  return {
    ...composeTodoDialogResult,
    done: false
  };
}
