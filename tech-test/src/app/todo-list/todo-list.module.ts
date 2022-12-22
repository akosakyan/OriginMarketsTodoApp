import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListPageComponent } from './components/todo-list-page';
import { TodoListItemComponent } from './components/todo-list-item';
import { TodoListFiltersComponent } from './components/todo-list-filters';
import { ComposeTodoComponent } from './components/compose-todo';

@NgModule({
  declarations: [
    TodoListPageComponent,
    TodoListItemComponent,
    TodoListFiltersComponent,
    ComposeTodoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    TodoListRoutingModule,
  ]
})
export class TodoListModule { }
