import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.action';

// request/response data defined in https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

export interface AuthResponseData {
  // 	A Firebase Auth ID token for the newly created user.
  idToken: string;
  // The email for the newly created user.
  email: string;
  // A Firebase Auth refresh token for the newly created user.
  refreshToken: string;
  // The number of seconds in which the ID token expires.
  expiresIn: string;
  // The uid of the newly created user.
  localId: string;
  // whether the email is for an existing account => login case
  registered?: boolean;

}

@Injectable()
export class AuthService {

  static SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  static LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

  // BehaviorSubject to let us can access the previous value of Subject
  // userBehaviorSubject = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  logout() {
    // @ts-ignore
    // this.userBehaviorSubject.next(null);
    this.store.dispatch(fromAuth.logout());
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number /* milli-second */) {
    console.log(`User token will be expired after ${expirationDuration * 1000} seconds `);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    // here if we parse the _tokeExpirationDate directly to Date by defining its data type is Date, then some method of Date
    // will not be available in the userData._tokenExpirationDate
    const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string }
      = JSON.parse(localStorage.getItem('userData') as string);
    if (!userData) {
      return;
    }
    const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (user.token) {
      // this.userBehaviorSubject.next(user);
      this.store.dispatch(fromAuth.authenticateSuccess({
        payload: {
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpirationDate)
        }
      }));
      const expiredTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expiredTime);
    }
  }
}
