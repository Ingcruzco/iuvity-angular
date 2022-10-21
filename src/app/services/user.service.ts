import { Injectable } from '@angular/core';
import { User, UserForm } from '../interfaces'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API:string = environment.api;
  constructor(private http:HttpClient) { }

  addUser(user:UserForm): Observable<User>{
    return this.http.post<User>(`${this.API}`,user);
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.API);
  }

  updateUser(id:string, user:UserForm): Observable<User> {
    return this.http.put<User>(`${this.API}/${id}`,user);
  }

  deleteUser(id:string): Observable<User>{
    return this.http.delete<User>(`${this.API}/${id}`);
  }
}
