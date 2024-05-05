import { Injectable } from '@angular/core';
import { USER_INFO } from "./common.const";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userInfo = JSON.parse(localStorage.getItem(USER_INFO) || '')
  restrictedUrls = ['create', 'edit', 'working-hours', 'users']

  isAdmin() {
    return this.userInfo.role == 'Admin'
  }

  restricted(pathname: string) {
    return this.restrictedUrls.find(url => {
      return pathname.includes(url)
    })
  }
}
