import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { user: { email: email, password: password } }, { observe: 'response' });
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { user: { name: name, email: email, password: password } }, { observe: 'response' });
  }

  getParkingLots(): Observable<any> {
    return this.http.get(`${this.baseUrl}/parking_lots`);
  }

  getSlots(parkingLotId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/parking_lots/${parkingLotId}/slots`);
  }

}
