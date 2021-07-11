import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as fromAuth from './auth.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../auth.service';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {of} from "rxjs";
import {User} from "../user.model";
import {createAction} from "@ngrx/store";

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

const handleAuthentication = (resData: AuthResponseData) => {
  const exDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
  const user = new User(resData.email, resData.localId, resData.idToken, exDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return fromAuth.authenticateSuccess({
    payload: {
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate: exDate
    }
  });
};

const handleAuthenticationError = (errResponse: any) => {
  let errMsg = 'An unknown error';
  if (errResponse.error && errResponse.error.error) {
    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errMsg = 'This email doesn\'t exist';
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'Invalid password';
        break;
      default:
        break;
    }
  }
  return of(fromAuth.authenticateFail({
    payload: {
      errorMsg: errMsg
    }
  }));
};

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions<fromAuth.AuthActionTypes>,
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(fromAuth.LOGIN_START),
    switchMap((action) => {
        return this.httpClient.post<AuthResponseData>(AuthService.LOGIN_URL,
          {
            email: action.payload.email,
            password: action.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          map(resData => {
            return handleAuthentication(resData);
          }),
          catchError(error => handleAuthenticationError(error)));
      }
    ));

  @Effect({dispatch: false}) // this effect doesn't dispatch any action.
  authRedirect = this.actions$.pipe(
    ofType(fromAuth.AUTHENTICATE_SUCCESS, fromAuth.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  signupStart = this.actions$.pipe(
    ofType(fromAuth.SIGNUP_START),
    switchMap((action) => {
        return this.httpClient.post<AuthResponseData>(AuthService.SIGNUP_URL,
          {
            email: action.payload.email,
            password: action.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          map(resData => {
            return handleAuthentication(resData);
          }),
          catchError(error => handleAuthenticationError(error)));
      }
    ));

  @Effect({dispatch: false}) // this effect doesn't dispatch any action.
  authLogout = this.actions$.pipe(
    ofType(fromAuth.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
    }));

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(fromAuth.AUTO_LOGIN),
    map(() => {
      // here if we parse the _tokeExpirationDate directly to Date by defining its data type is Date, then some method of Date
      // will not be available in the userData._tokenExpirationDate
      const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string }
        = JSON.parse(localStorage.getItem('userData') as string);
      if (!userData) {
        return fromAuth.dummyAction();
      }
      const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (user.token) {
        // this.userBehaviorSubject.next(user);
        return fromAuth.authenticateSuccess({
          payload: {
            email: userData.email,
            userId: userData.id,
            token: userData._token,
            expirationDate: new Date(userData._tokenExpirationDate)
          }
        });
        // const expiredTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        // this.autoLogout(expiredTime);
      }
      return fromAuth.dummyAction();
    })
  );
}
