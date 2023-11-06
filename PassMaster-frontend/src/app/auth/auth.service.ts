import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() { }

  setToken(token: string) {
    sessionStorage.setItem("auth-token", token);
  }

  getToken(): string | null {
    return sessionStorage.getItem("auth-token");
  }

  deleteToken() {
    sessionStorage.removeItem("auth-token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getDecodedToken(token: string | null): any {
    if (token) {
      try {
        return jwt_decode(token);
      } catch(error) {

      }
    }
  }

  setRefreshToken(refreshToken: string) {
    sessionStorage.setItem("refresh-token", refreshToken);
  }
}