import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private router: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.parkingLotId = params['parkingLotId'];

      this.appService.getSlots(this.parkingLotId)
      .subscribe((res: any) => {
        if(res && res.length > 0) {
          this.showSlots = true;
          this.slots = res;
        }
      }, (err: any) => {
        console.log('Error', err);
      });
    });
  }
}
