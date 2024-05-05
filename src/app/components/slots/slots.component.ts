import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { AuthorizationService } from '../../shared/authorization.service';
import { CommonModule } from '@angular/common';
import { WORKING_HOURS_RANGE, CAR_TYPES, USER_INFO } from '../../shared/common.const';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  currentHour = new Date().getHours()
  hours: string[] = [];
  carTypes = CAR_TYPES;
  userInfo = JSON.parse(window.localStorage.getItem(USER_INFO) || '{}');
  slotBooked: boolean = false;


  constructor(
    private router: ActivatedRoute,
    private appService: AppService,
    private route: Router,
    private authService: AuthorizationService,
    private fb: FormBuilder
  ) {
    this.workingHoursRange = window.localStorage.getItem(WORKING_HOURS_RANGE)?.split(',');
    for (let i = 0; i < 24; i++) {
      this.hours.push(`${i < 10 ? '0' : ''}${i}:00`);
    }
  }

  filterForm = this.fb.group({
    date: [this.currentDate],
    hour: [`${this.currentHour < 10 ? '0' : ''}${this.currentHour}:00`],
    carType: [''],
    shade: [false],
    evCharging: [false],
    disabledPeopleOnly: [false]
  });

  filterSlots() {
    let filters = {
      date: this.filterForm.value.date,
      hour: this.filterForm.value.hour,
      carType: this.filterForm.value.carType,
      shade: this.filterForm.value.shade,
      evCharging: this.filterForm.value.evCharging,
      disabledPeopleOnly: this.filterForm.value.disabledPeopleOnly
    }
    this.slotBooked = this.checkSlotBooked();
    if(!this.slotBooked) {
      this.appService.getSlots(filters)
      .subscribe((res: any) => {
        this.showSlots = res.length > 0;
        this.slots = res;
      }, (err: any) => {
        this.route.navigate(['/login']);
      });
    } else {
      this.showSlots = false;
    }
  }

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.slotBooked = this.checkSlotBooked();

    if(!this.slotBooked) {
      this.router.params.subscribe(params => {
        this.parkingLotId = params['parkingLotId'];
        this.appService.getSlots({date: this.filterForm.value.date || '', hour: this.filterForm.value.hour || ''})
        .subscribe((res: any) => {
          if(res && res.length > 0) {
            this.showSlots = true;
            this.slots = res
          }
        }, (err: any) => {
          this.route.navigate(['/login']);
        });
      });
    }
  }

  checkSlotBooked(): any {
    return this.userInfo.reservations?.find((reservation: any) => {
      return reservation.start_hour == this.filterForm.value.hour && reservation.date == this.filterForm.value.date && reservation.status == 'active'
    })
  }
}
