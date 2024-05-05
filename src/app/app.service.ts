import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = 'http://localhost:3000';
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

  getSlots(parkingLotId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/slots`);
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

}
