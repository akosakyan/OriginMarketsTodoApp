import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';

import { TodoEntityModel } from '../models';
import { UpdateTodoDto, CreateTodoDto } from './dto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly basePath: string;

  constructor(private httpClient: HttpClient) {
    this.basePath = `${environment.apiUrl}/tasks`;
  }

  getAll(): Observable<TodoEntityModel[]> {
    return this.httpClient.get<TodoEntityModel[]>(this.basePath);
  }

  getById(id: TodoEntityModel['id']): Observable<TodoEntityModel> {
    return this.httpClient.get<TodoEntityModel>(`${this.basePath}/${id}`);
  }

  update(id: TodoEntityModel['id'], updateTodoDTO: UpdateTodoDto): Observable<TodoEntityModel> {
    return this.httpClient.patch<TodoEntityModel>(`${this.basePath}/${id}`, updateTodoDTO);
  }

  create(createTodoDto: CreateTodoDto): Observable<TodoEntityModel> {
    return this.httpClient.post<TodoEntityModel>(`${this.basePath}`, createTodoDto);
  }

  delete(id: TodoEntityModel['id']): Observable<{}> {
    return this.httpClient.delete<{}>(`${this.basePath}/${id}`);
  }
}
