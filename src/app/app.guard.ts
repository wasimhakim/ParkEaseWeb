// a guard file with a canActivate method that checks if the user is logged in or not
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { API_ACCESS_TOKEN } from './shared/common.const';
import { AuthorizationService } from './shared/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthorizationService
  ) { }

  canActivate(): boolean {
    if (localStorage.getItem(API_ACCESS_TOKEN)) {
      if(this.authService.isAdmin()) {
        return true;
      } else {
        if(this.authService.restricted(window.location.pathname)) {
          this.router.navigate(['/page-not-found']);
          return false;
        } else {
          return true;
        }
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
