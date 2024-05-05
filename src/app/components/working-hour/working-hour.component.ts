import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-working-hour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './working-hour.component.html',
  styleUrl: './working-hour.component.css'
})
export class WorkingHourComponent {
  errorMessage: string = '';
  hours: string[] = [];

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    for (let i = 0; i < 24; i++) {
      this.hours.push(`${i < 10 ? '0' : ''}${i}:00`);
    }
  }

  workingHoursForm = this.fb.group({
    startHour: ['', Validators.required],
    endHour: ['', Validators.required]
  });

  updateWorkingHours() {
    if(this.workingHoursForm.valid) {
      this.errorMessage = '';
      let formData = this.workingHoursForm.value;
      let workingHours = {
        start_hour: formData.startHour,
        end_hour: formData.endHour
      };
      this.appService.updateWorkingHours(workingHours)
      .subscribe((res: any) => {
        if(res) {
          window.location.pathname = '/slots';
        }
      });
    } else {
      this.errorMessage = 'Please fill in both fields';
    }
  }
}
