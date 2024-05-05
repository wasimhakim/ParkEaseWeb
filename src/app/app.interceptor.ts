import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { API_ACCESS_TOKEN } from './shared/common.const';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Exclude login, signup, and logout requests
    if (request.url.includes('/login') || request.url.includes('/signup')) {
      return next.handle(request);
    }

    // Add authorization token to other requests
    const authToken = localStorage.getItem(API_ACCESS_TOKEN);
    if (authToken) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `${authToken}`
        }
      });
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }
}
