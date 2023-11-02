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

  getAllUsers(): Observable<User[]> {
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

  getUsersByMail(mail: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "/search", { params: { mail } });
  }

  getFriendsByUserId(userId: number): Observable<User[]> {
    const url = `${this.apiUrl}/${userId}/friends`;
    return this.http.get<User[]>(url);
  }

  addFriend(userId: number, friend: User): Observable<User> {
    const url = `${this.apiUrl}/${userId}/addFriend`;
    return this.http.put<User>(url, friend.id);
  }

  register(newUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + "/registration", newUser);
  }

  activate(activation: Activation): Observable<Activation> {
    return this.http.post<Activation>(this.apiUrl + "/activation", activation);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/login", { username, password });
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/logout", null);
  }

  sendResetPasswordMail(userMail: string): Observable<any> {
    const requestBody = {
      mail: userMail
    };
    return this.http.post<any>(this.apiUrl + "/reset-password-mail", requestBody);
  }

  resetPassword(userMail: string, code: string, newPass: string): Observable<any> {
    const requestBody = {
      mail: userMail,
      code: code,
      password: newPass
    };
  
    return this.http.post<any>(this.apiUrl + "/reset-password", requestBody);
  }
  
}
