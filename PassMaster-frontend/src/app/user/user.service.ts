import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { Activation } from '../activation/activation.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  updateUser(updatedUser: User): Observable<User> {
    const url = `${this.apiUrl}/${updatedUser.id}`;
    return this.http.put<User>(url, updatedUser);
  }  

  deleteUser(deletedUser: User): Observable<void> {
    const url = `${this.apiUrl}/${deletedUser.id}`;
    return this.http.delete<void>(url);
  }

  register(newUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + "/registration", newUser);
  }

  activate(activation: Activation): Observable<Activation> {
    return this.http.post<Activation>(this.apiUrl + "/activation", activation);
  }
}
