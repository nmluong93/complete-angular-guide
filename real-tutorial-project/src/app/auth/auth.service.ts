import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}

@Injectable()
export class AuthService {

  static SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=\n' +
    'AIzaSyAXIQXKgnqtAgGZDVxOfL6q5qZuPLcEAqc';

  constructor(private httpClient: HttpClient) {}

  signup(emailVal: string, pwd: string) {
    return this.httpClient.post<AuthResponseData>(AuthService.SIGNUP_URL,
      {
        email: emailVal,
        password: pwd,
        returnSecureToke: true
      }
    );
  }
}
