import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const userToken = sessionStorage.getItem('auth-token');

    if (userToken) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
        }
      });
      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}
