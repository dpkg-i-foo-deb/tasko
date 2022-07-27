import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { Observable } from 'rxjs';
import {
  LoginResponse,
  PingResponse,
  RefreshResponse,
} from '../models/response';
import { SignUpResponse } from '../models/response';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class Api {
  getCookieOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  pingOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  refreshOptions = {
    withCredentials: true,
  };

  getTasksOptions = {
    withCredentials: true,
  };

  createTaskOptions = {
    withCredentials: true,
  };

  updateTaskOptions = {
    withCredentials: true,
  };

  deleteTaskOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.apiUrl + environment.loginPath,
      user,
      this.getCookieOptions
    );
  }

  signup(user: User): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
      environment.apiUrl + environment.signupPath,
      user
    );
  }

  //Used to check if the access token either exists or is valid
  ping(): Observable<PingResponse> {
    return this.http.get<PingResponse>(
      environment.apiUrl + environment.pingPath,
      this.pingOptions
    );
  }

  refresh(): Observable<RefreshResponse> {
    return this.http.get<RefreshResponse>(
      environment.apiUrl + environment.refreshPath,
      this.refreshOptions
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      environment.apiUrl + environment.getTasksPath,
      this.getTasksOptions
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.put<Task>(
      environment.apiUrl + environment.createTaskPath,
      task,
      this.createTaskOptions
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.patch<any>(
      environment.apiUrl + environment.updateTaskPath + '/' + task.code,
      task,
      this.updateTaskOptions
    );
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.delete<any>(
      environment.apiUrl + environment.updateTaskPath + '/' + task.code,
      this.updateTaskOptions
    );
  }
}
