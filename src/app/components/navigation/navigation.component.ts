import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { WORKING_HOURS_RANGE } from '../../shared/common.const';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../shared/authorization.service';

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
    private authService: AuthorizationService
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
}
