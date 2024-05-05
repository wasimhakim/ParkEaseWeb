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
      window.location.href = '/login';
    });
  }

  checkIn(reservation: any) {
    this.updateReservation(reservation.id, { reservation: { check_in: new Date() } });
  }

  checkOut(reservation: any) {
    this.updateReservation(reservation.id, { reservation: { check_out: new Date() } });
  }

  cancelReservation(reservation: any) {
    const fee = this.calculateCancellationFee(reservation);
    if (fee > 0) {
      alert(`You will be charged a cancellation fee of $${fee}`);
    }
    if(confirm('Are you sure you want to cancel?') == true) {
      this.updateReservation(reservation.id, { reservation: { status: 'cancelled' } });
    }
  }

  updateReservation(reservationId: any, reservation: any) {
    this.appService.updateReservation(reservationId, reservation).subscribe
    (response => {
      window.location.reload();
    }, (error) => {
      this.errorMessage = 'Invalid update'
    });
  }

  calculateCancellationFee(reservation: any): number {
    const diff = (new Date().getHours()) - reservation.start_hour.split(':')[0];
    console.log(diff)
    if (diff < reservation.cacellation_time_frame_hour) {
      return reservation.price * (parseFloat(reservation.cancellation_fee_percentage || 0.0) / 100);
    } else {
      return 0;
    }
  }
}
