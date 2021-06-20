import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  authResponseData: AuthResponseData;
  isLoginMode = true;
  isLoading = false;
  error: any;

  // instead of adding selector for ViewChild we can use type of child, then Angular will look for the first matching type of the
  // template file to determine the right element
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

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
        this.router.navigate(['/recipes']);
      },
      errorRs => {
        console.log(`error occurs ${errorRs}`);
        console.log(errorRs);
        // this.error = errorRs.error.error.message;
        this.error = errorRs;
        this.isLoading = false;
        this.showErrorAlert(this.error);
      });
    loginForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  /**
   * Dynamically create alert component - programmatically.
   */
  private showErrorAlert(message: string) {
    // this initialization won't work but the ComponentFactory
    // const alertCmp = new AlertComponent();
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // Just clear place of the ViewChild before rendering new content
    hostViewContainerRef.clear();

    // At ng-template, create alert component
    const alertCompRef = hostViewContainerRef.createComponent(alertCompFactory);

    alertCompRef.instance.message = message;
    this.closeSub = alertCompRef.instance.closed.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
