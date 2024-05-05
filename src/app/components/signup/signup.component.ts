import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { API_ACCESS_TOKEN } from '../../shared/common.const';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  errorMessage: string = '';
  signUpPage: boolean = false;
  customerPage: boolean = false;
  adminPage: boolean = false;

  constructor(
    private formGroup: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.signUpPage = this.router.url.includes('signup')
    this.customerPage = this.router.url.includes('customers')
    this.adminPage = this.router.url.includes('admins')
  }

  signUpForm = this.formGroup.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]]
  });

  handleForm() {
    let formData = this.signUpForm.value;
    let userData = {
      name: formData.name || '',
      email: formData.email || '',
      password: formData.password || '',
      role_id: this.adminPage ? 1 : ''
    };
    this.appService.signup({user: userData}).subscribe((res: any) => {
      let token = res.headers.get('Authorization');
      if(token) {
        if(this.signUpPage) {
          this.errorMessage = '';
          localStorage.setItem(API_ACCESS_TOKEN, token);
          this.router.navigate(['/slots']);
        }
        if(this.customerPage) this.router.navigate(['/users/customers']);
        if(this.adminPage) this.router.navigate(['/users/admins']);
      }
    }, (err: any) => {
      console.log(err);
    });
  }

}
