import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ParkingLotsComponent } from './components/parking-lots/parking-lots.component';
import { SlotsComponent } from './components/slots/slots.component';
import { AppGuard } from './app.guard';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'parking-lots', pathMatch: 'full' },
      { path: 'parking-lots', component: ParkingLotsComponent },
      { path: 'slots/:parkingLotId', component: SlotsComponent }
    ],
    canActivate: [AppGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent}
];
