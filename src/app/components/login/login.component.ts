import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// services
import { AppService } from '../../app.service';
import { API_ACCESS_TOKEN } from '../../shared/common.const';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) { }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login() {
    let formData = this.loginForm.value;
    this.appService.login(formData.email || '', formData.password || '')
    .subscribe(response => {
        let token = response.headers.get('Authorization');
        if (token) {
          this.errorMessage = '';
          localStorage.setItem(API_ACCESS_TOKEN, token);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
