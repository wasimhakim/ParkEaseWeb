import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-lots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parking-lots.component.html',
  styleUrl: './parking-lots.component.css'
})
export class ParkingLotsComponent {
  parkingLots: any[] = [];

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.appService.getParkingLots().subscribe((response) => {
      this.parkingLots = response;
    }, (error) => {
      this.router.navigate(['/login']);
    });
  }

  goToSlots(parkingLotId: number) {
    this.router.navigate(['/slots', parkingLotId]);
  }
}
