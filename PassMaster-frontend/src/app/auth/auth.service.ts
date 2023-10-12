import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  setToken(token: string) {
    localStorage.setItem("auth-token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("auth-token");
  }

  deleteToken() {
    localStorage.removeItem("auth-token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}