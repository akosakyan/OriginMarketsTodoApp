import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoListPageComponent } from './components/todo-list-page';

const routes: Routes = [{
  path: '',
  component: TodoListPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule { }
