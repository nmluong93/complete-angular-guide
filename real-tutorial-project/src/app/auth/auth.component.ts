import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authResponseData: AuthResponseData;
  isLoginMode = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    if (this.isLoginMode) {
      // ...
    }
    else {
      this.authService.signup(loginForm.value?.email, loginForm.value?.password)
        .subscribe(rs => {
            console.log(rs);
            this.authResponseData = rs;
          },
          error => {
            console.log(`error occurs ${error}`);
          })
      loginForm.reset();
    }
  }
}
