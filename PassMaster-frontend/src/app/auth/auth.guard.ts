import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      const allowedRoutes = ['/login', '/register', '/validate'];
      if (allowedRoutes.includes(state.url)) {
        return true;
      } else {
        return this.router.parseUrl('/login');
      }
    } else {
      const restrictedRoutes = ['/login', '/register', '/validate'];
      if (restrictedRoutes.includes(state.url)) {
        return this.router.parseUrl('/home');
      } else {
        return true;  
      }
    }
  }
}
