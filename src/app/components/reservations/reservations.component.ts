import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';
import { USER_INFO } from '../../shared/common.const';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  reservations: any[] = [];
  errorMessage: string = '';
  userInfo = JSON.parse(localStorage.getItem(USER_INFO) || '{}');

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getReservations().subscribe
    (response => {
      this.reservations = response;
      this.userInfo.reservations = this.reservations;
      localStorage.setItem(USER_INFO, JSON.stringify(this.userInfo));
    }, (error) => {
      this.errorMessage = 'Invalid reservations details'
    });
  }

  checkIn(reservation: any) {
    this.updateReservation(reservation.id, { reservation: { check_in: new Date() } });
  }

  checkOut(reservation: any) {
    this.updateReservation(reservation.id, { reservation: { check_out: new Date() } });
  }

  cancelReservation(reservation: any) {
    this.updateReservation(reservation.id, { reservation: { status: 'cancelled' } });
  }

  updateReservation(reservationId: any, reservation: any) {
    this.appService.updateReservation(reservationId, reservation).subscribe
    (response => {
      window.location.reload();
    }, (error) => {
      this.errorMessage = 'Invalid update'
    });
  }
}
