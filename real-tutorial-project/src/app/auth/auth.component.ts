import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authResponseData: AuthResponseData;
  isLoginMode = true;
  isLoading = false;
  error: string;

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

    this.isLoading = true;
    this.error = '';
    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(loginForm.value?.email, loginForm.value?.password);
    }
    else {
      authObs = this.authService.signup(loginForm.value?.email, loginForm.value?.password);

    }
    authObs.subscribe(rs => {
      console.log(rs);
      this.authResponseData = rs;
      this.isLoading = false;
    },
      errorRs => {
        console.log(`error occurs ${errorRs}`);
        console.log(errorRs);
        // this.error = errorRs.error.error.message;
        this.error = errorRs;
        this.isLoading = false;
      });
    loginForm.reset();
  }
}
