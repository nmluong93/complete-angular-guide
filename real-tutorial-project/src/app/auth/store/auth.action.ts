import {createAction, props, union} from '@ngrx/store';

export const LOGIN_START = '[Auth] Login start';
export const AUTHENTICATE_FAIL = '[Auth]  Authenticate fail';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate success';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNUP_START = '[Auth] Sign-up start';
export const HANDLE_ERROR = '[Auth] handle error';
export const AUTO_LOGIN = '[Auth] Auto login';
export const AUTO_LOGOUT = '[Auth] Auto logout';

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    payload: {
      email: string,
      userId: string,
      token: string | null,
      expirationDate: Date,
      redirect: boolean
    }
  }>()
);

export const handleError = createAction(HANDLE_ERROR);

export const logout = createAction(
  LOGOUT
);

export const loginStart = createAction(
  LOGIN_START,
  props<{
    payload: {
      email: string,
      password: string
    }
  }>()
);

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{
    payload: {
      errorMsg: string
    }
  }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{
    payload: {
      email: string,
      password: string
    }
  }>()
);

export const dummyAction = createAction('DUMMY');

export const autoLogin = createAction(AUTO_LOGIN);
export const autoLogout = createAction(AUTO_LOGOUT);

export const all = union({
  loginStart,
  authenticateSuccess,
  logout,
  authenticateFail,
  signupStart,
  autoLogin,
  autoLogout
});

export type AuthActionTypes = typeof all;
