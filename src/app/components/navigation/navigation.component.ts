import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { API_ACCESS_TOKEN, WORKING_HOURS_RANGE } from '../../shared/common.const';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../shared/authorization.service';
import { USER_INFO } from '../../shared/common.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  workingHours: string = '';
  menuOpen: boolean = false;
  admin: boolean = false;

  constructor(
    private appService: AppService,
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.admin = this.authService.isAdmin()
    this.appService.workingHours()
    .subscribe((res: any) => {
      if(res) {
        this.workingHours = `${res.start_hour} - ${res.end_hour}`;
        window.localStorage.setItem(WORKING_HOURS_RANGE, res.range);
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.appService.logout().subscribe((res) => {
      window.localStorage.removeItem(USER_INFO);
      window.localStorage.removeItem(API_ACCESS_TOKEN)
      this.router.navigate(['/login']);
    }, (error) => {
      this.router.navigate(['/login']);
    })
  }
}
