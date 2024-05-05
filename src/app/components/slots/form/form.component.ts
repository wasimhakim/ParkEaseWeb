import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WORKING_HOURS_RANGE, CAR_TYPES } from '../../../shared/common.const';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {
  workingHoursRange: any;
  carTypes = CAR_TYPES;
  @Input() errorMessage: string = '';
  @Input() slot: any;

  @Output() formData = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder
  ) {
    this.workingHoursRange = window.localStorage.getItem(WORKING_HOURS_RANGE)?.split(',');
  }

  ngOnInit() {
    if (this.slot) {
      this.slot.subscribe((slot: any) => {
        this.slotForm.patchValue({
          number: slot.number,
          startHour: slot.start_hour,
          endHour: slot.end_hour,
          price: slot.price,
          status: slot.status,
          carType: slot.features ? slot.features['car_type'] : '',
          hasShade: slot.features ? slot.features['has_shade'] : '',
          evCharging: slot.features ? slot.features['ev_charging'] : '',
          disabledPeopleOnly: slot.features ? slot.features['disabled_people_only'] : '',
          cancellationTimeFrameHours: slot.cancellation_time_frame_hours,
          cancellationFeePercentage: slot.cancellation_fee_percentage
        });
      });

    }
  }

  slotForm = this.fb.group({
    number: ['', Validators.required],
    startHour: ['', Validators.required],
    endHour: ['', Validators.required],
    price: ['', Validators.required],
    status: ['', Validators.required],
    carType: ['',],
    hasShade: [''],
    evCharging: [''],
    disabledPeopleOnly: [''],
    cancellationTimeFrameHours: [0],
    cancellationFeePercentage: [0]
  });

  submitForm() {
    this.formData.emit(this.slotForm.value);
  }

}
