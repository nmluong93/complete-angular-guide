import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select('auth').pipe(
      // just listen to one 1 to prevent the Guard keeps listening
      take(1),
      map(appState => {
        const isAuth = !!appState.user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }));
  }

}
