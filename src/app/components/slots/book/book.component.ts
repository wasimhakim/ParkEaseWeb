import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WORKING_HOURS_RANGE, USER_INFO } from '../../../shared/common.const';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  errorMessage: string = '';
  workingHoursRange = window.localStorage.getItem(WORKING_HOURS_RANGE)?.split(',');
  slotId: number = 0;
  slot: any = {};
  bookingDate: any = {};
  bookingStartHour: any = '';
  canBook: boolean = true;
  user_id = JSON.parse(window.localStorage.getItem(USER_INFO) || '')
  calculatedPrice: number = 0;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    // Get slot details
    // Get slot id from route params
    this.slotId = this.route.snapshot.params['id'];
    this.bookingDate = this.route.snapshot.queryParams['date'] || new Date().toISOString().split('T')[0];
    this.bookingStartHour = this.route.snapshot.queryParams['hour'] || `${new Date().getHours()}:00`;

    this.appService.getSlot(this.slotId).subscribe
    (response => {
      this.slot = response;
      this.canBook = this.slot.status === 'available';
    }, (error) => {
      this.errorMessage = 'Invalid slot details'
    });
  }

  bookingForm = this.fb.group({
    endHour: [''],
  })

  bookSlot() {
    const formData = this.bookingForm.value;
    const booking = {
      start_hour: this.bookingStartHour,
      end_hour: formData.endHour,
      date: this.bookingDate,
      slot_id: this.slotId,
      user_id: this.user_id.id,
      status: 'active',
      price: this.calculatedPrice,
      cancellation_fee_percentage: this.slot.cancellation_fee_percentage,
      cancellation_time_frame_hours: this.slot.cancellation_time_frame_hours
    }
    this.appService.bookSlot({reservation: booking}).subscribe
    (response => {
      this.router.navigate(['/reservations']);
    }, (error) => {
      this.errorMessage = 'Invalid booking details'
    });
  }

  calculatePrice() {
    const formData = this.bookingForm.value;
    const startHour = parseInt(this.bookingStartHour.split(':')[0]);
    const endHour = parseInt(formData.endHour?.split(':')[0] || '0');
    this.calculatedPrice = (endHour - startHour) * this.slot.price;
  }
}
