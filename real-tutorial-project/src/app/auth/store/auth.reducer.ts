import {createReducer, on} from '@ngrx/store';
import {User} from '../user.model';
import * as authAction from './auth.action';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export const authReducer = createReducer(initialState,
  on(authAction.authenticateSuccess, (state, {payload}) => {
    const user = new User(payload.email, payload.userId, payload.token, payload.expirationDate);
    return {
      ...state,
      user,
      authError: null,
      loading: false
    };
  }),
  on(authAction.logout, state => {
    return {
      ...state,
      user: null,
      authError: null
    };
  }),
  on(authAction.loginStart, authAction.signupStart, (state, {payload}) => {
    return {
      ...state,
      authError: null,
      loading: true
    };
  }),
  on(authAction.authenticateFail, (state, {payload}) => {
    return {
      ...state,
      authError: payload.errorMsg,
      user: null,
      loading: false
    };
  }),
  on(authAction.handleError, (state) => {
    return {
      ...state,
      authError: null
    };
  })
);
