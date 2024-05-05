import { Component } from '@angular/core';
import { UserTableComponent } from '../user-table/user-table.component';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  users: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
