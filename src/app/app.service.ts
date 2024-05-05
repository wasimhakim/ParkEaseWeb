import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = 'http://54.95.78.18:3000'//'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?admins=true`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { user: { email: email, password: password } }, { observe: 'response' });
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user, { observe: 'response' });
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/logout`);
  }

  getSlots(filters: any): Observable<any> {
    const { date, hour, carType, shade, evCharging, disabledPeopleOnly } = filters;
    const filterParams = [];
    if (date) filterParams.push(`date=${date}`);
    if (hour) filterParams.push(`hour=${hour}`);
    if (carType) filterParams.push(`car_type=${carType}`);
    if (shade) filterParams.push(`has_shade=${shade}`);
    if (evCharging) filterParams.push(`ev_charging=${evCharging}`);
    if (disabledPeopleOnly) filterParams.push(`disabled_people_only=${disabledPeopleOnly}`);
    return this.http.get(`${this.baseUrl}/slots?${filterParams.join('&')}`);
  }

  getSlot(slotId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/slots/${slotId}`);
  }

  updateSlot(slot: any, slotId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/slots/${slotId}`, slot);
  }

  createSlot(slot: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/slots`, slot);
  }

  workingHours(): Observable<any> {
    return this.http.get(`${this.baseUrl}/parking_working_hours`);
  }

  updateWorkingHours(workingHours: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/parking_working_hours`, workingHours);
  }

  bookSlot(booking: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, booking);
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reservations`);
  }

  updateReservation(reservationId: number, reservation: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/reservations/${reservationId}`, reservation);
  }
}
