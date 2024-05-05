import { Injectable } from '@angular/core';
import { USER_INFO } from "./common.const";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userInfo: any = localStorage.getItem(USER_INFO);
  restrictedUrls = ['create', 'edit', 'working-hours', 'users']

  constructor() {
    if(this.userInfo) {
      this.userInfo = JSON.parse(this.userInfo)
    }
  }

  isAdmin() {
    return this.userInfo?.role == 'Admin'
  }

  restricted(pathname: string) {
    return this.restrictedUrls.find(url => {
      return pathname.includes(url)
    })
  }
}
