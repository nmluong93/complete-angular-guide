import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';

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
  registered?: boolean

}

@Injectable()
export class AuthService {

  static SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=\n' +
    'AIzaSyAXIQXKgnqtAgGZDVxOfL6q5qZuPLcEAqc';

  static LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXIQXKgnqtAgGZDVxOfL6q5qZuPLcEAqc';

  // @ts-ignore
  user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) { }

  signup(emailVal: string, pwd: string) {
    return this.httpClient.post<AuthResponseData>(AuthService.SIGNUP_URL,
      {
        email: emailVal,
        password: pwd,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
    tap(rs =>
      this.handleAuthentication(rs.email, rs.localId, rs.idToken, +rs.expiresIn)
    ));
}

  login(emailVal: string, pwd: string) {
    return this.httpClient.post<AuthResponseData>(AuthService.LOGIN_URL,
      {
        email: emailVal,
        password: pwd,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
      tap(rs =>
        this.handleAuthentication(rs.email, rs.localId, rs.idToken, +rs.expiresIn)
      ));
  }

  private handleAuthentication(email: string, userId: string, token: string, exDateInSecond: number) {
    const exDate = new Date(new Date().getTime() + exDateInSecond * 1000);
    const user = new User(email, userId, token, exDate);
    this.user.next(user);
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errMsg = 'An unknown error';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errMsg);
    }
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
    }
    return throwError(errMsg);
  }
}
