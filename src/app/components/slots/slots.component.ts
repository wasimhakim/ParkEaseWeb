import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { AuthorizationService } from '../../shared/authorization.service';
import { CommonModule } from '@angular/common';
import { WORKING_HOURS_RANGE } from '../../shared/common.const';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.css'
})
export class SlotsComponent {
  parkingLotId: number = 0;
  slots: any[] = [];
  showSlots: boolean = false;
  admin: boolean = false;
  workingHoursRange: any;
  currentDate = new Date().toISOString().split('T')[0];
  cuurentHour = new Date().getHours()
  hours: string[] = [];

  constructor(
    private router: ActivatedRoute,
    private appService: AppService,
    private route: Router,
    private authService: AuthorizationService
  ) {
    this.workingHoursRange = window.localStorage.getItem(WORKING_HOURS_RANGE)?.split(',');
    for (let i = 0; i < 24; i++) {
      this.hours.push(`${i < 10 ? '0' : ''}${i}:00`);
    }
  }

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.router.params.subscribe(params => {
      this.parkingLotId = params['parkingLotId'];

      this.appService.getSlots(this.parkingLotId)
      .subscribe((res: any) => {
        if(res && res.length > 0) {
          this.showSlots = true;
          this.slots = res;
        }
      }, (err: any) => {
        this.route.navigate(['/login']);
      });
    });
  }
}
