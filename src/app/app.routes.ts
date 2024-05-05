import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { SlotsComponent } from './components/slots/slots.component';
import { CreateSlotComponent } from './components/slots/create-slot/create-slot.component';
import { EditSlotComponent } from './components/slots/edit-slot/edit-slot.component';
import { WorkingHourComponent } from './components/working-hour/working-hour.component';
import { UsersComponent } from './components/users/users.component';
import { AdminsComponent } from './components/users/admins/admins.component';
import { CustomersComponent } from './components/users/customers/customers.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookComponent } from './components/slots/book/book.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AppGuard } from './app.guard';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'slots', pathMatch: 'full' },
      { path: 'slots', component: SlotsComponent },
      { path: 'slots/create', component: CreateSlotComponent },
      { path: 'working-hours', component: WorkingHourComponent },
      { path: 'slots/:id/edit', component: EditSlotComponent },
      { path: 'slots/:id/book', component: BookComponent },
      { path: 'reservations', component: ReservationsComponent },
      {
        path: 'users', component: UsersComponent,
        children: [
          { path: '', redirectTo: 'customers', pathMatch: 'full' },
          { path: 'admins', component: AdminsComponent },
          { path: 'customers', component: CustomersComponent },
          { path: 'admins/create', component: SignupComponent },
          { path: 'customers/create', component: SignupComponent }
        ]
      }
    ],
    canActivate: [AppGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: '**', component: PageNotFoundComponent }
];
