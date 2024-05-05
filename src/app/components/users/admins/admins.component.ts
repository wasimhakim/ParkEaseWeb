import { Component } from '@angular/core';
import { AppService } from '../../../app.service';
import { UserTableComponent } from '../user-table/user-table.component';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
  users: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getAdmins().subscribe((data) => {
      this.users = data;
    });
  }
}
