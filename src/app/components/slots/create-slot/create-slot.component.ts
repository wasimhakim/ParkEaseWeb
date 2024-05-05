import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-create-slot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormComponent],
  templateUrl: './create-slot.component.html',
  styleUrl: './create-slot.component.css'
})
export class CreateSlotComponent {
  errorMessage: string = '';
  workingHoursRange: any;
  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  createSlot($event: any) {
    let formData = $event;
    let slot = {
      number: formData.number,
      start_hour: formData.startHour,
      end_hour: formData.endHour,
      price: formData.price,
      status: formData.status,
      cancellation_time_frame_hours: formData.cancellationTimeFrameHours,
      cancellation_fee_precentage: formData.cancellationFeePercentage,
      features: {
        car_type: formData.carType,
        has_shade: formData.hasShade,
        ev_charging: formData.evCharging,
        disabled_people_only: formData.disabledPeopleOnly
      }
    };
    this.appService.createSlot({slot: slot}).subscribe
    (response => {
      this.router.navigate(['/slots']);
    }, (error) => {
      this.errorMessage = 'Invalid slot details'
    });
  }
}
