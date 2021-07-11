import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {from, Subscription} from 'rxjs';
import {AuthService} from './auth.service';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder.directive';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: any;

  // instead of adding selector for ViewChild we can use type of child, then Angular will look for the first matching type of the
  // template file to determine the right element
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth')
      .subscribe(authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.error = '';
    if (this.isLoginMode) {
      // authObs = this.authService.login(loginForm.value?.email, loginForm.value?.password);
      this.store.dispatch(fromAuth.loginStart({
        payload: {
          email: loginForm.value?.email,
          password: loginForm.value?.password
        }
      }));
    } else {
      this.store.dispatch(fromAuth.signupStart({
        payload: {
          email: loginForm.value?.email,
          password: loginForm.value?.password
        }
      }));

    }
    loginForm.reset();
  }

  onHandleError() {
    this.store.dispatch(fromAuth.handleError());
  }

  /**
   * Dynamically create alert component - programmatically.
   * This is not recommended. Please use *ngIf if possible, it is much simpler.
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
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
