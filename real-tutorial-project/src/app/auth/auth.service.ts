import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authAction from './store/auth.action';

// request/response data defined in https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

@Injectable()
export class AuthService {

  static SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  static LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

  // BehaviorSubject to let us can access the previous value of Subject
  // userBehaviorSubject = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  constructor(
    private store: Store<fromApp.AppState>) {
  }

  setLogoutTimer(expirationDuration: number /* milli-second */) {
    console.log(`User token will be expired after ${expirationDuration * 1000} seconds `);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(authAction.logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}
