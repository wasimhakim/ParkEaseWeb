// a guard file with a canActivate method that checks if the user is logged in or not
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { API_ACCESS_TOKEN } from './shared/common.const';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem(API_ACCESS_TOKEN)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
