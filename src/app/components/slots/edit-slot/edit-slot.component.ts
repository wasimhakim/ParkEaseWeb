import { Component, Output, EventEmitter } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-slot',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit-slot.component.html',
  styleUrl: './edit-slot.component.css'
})
export class EditSlotComponent {
  errorMessage: string = '';
  slotId: number = 0;
  slot: any = {};

  @Output() slotData = new EventEmitter<any>();
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Get slot id from route params
    this.slotId = this.route.snapshot.params['id'];
    // Get slot details
    this.appService.getSlot(this.slotId).subscribe
    (response => {
      this.slot = response;
      this.slotData.emit(this.slot)
    }, (error) => {
      this.errorMessage = 'Invalid slot details'
    });
  }

  updateSlot($event: any) {
    let formData = $event;
    let slot = {
      number: formData.number,
      start_hour: formData.startHour,
      end_hour: formData.endHour,
      price: formData.price,
      status: formData.status,
      cancellation_time_frame_hours: formData.cancellationTimeFrameHours,
      cancellation_fee_percentage: formData.cancellationFeePercentage,
      features: {
        car_type: formData.carType,
        has_shade: formData.hasShade,
        ev_charging: formData.evCharging,
        disabled_people_only: formData.disabledPeopleOnly
      }
    };

    this.appService.updateSlot(slot, this.slotId).subscribe
    (response => {
      this.router.navigate(['/slots']);
    }, (error) => {
      this.errorMessage = 'Invalid slot details'
    });
  }

}
