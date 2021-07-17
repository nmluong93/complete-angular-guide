import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as fromAuth from '../auth/store/auth.action';
import * as fromRecipe from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;

  isAuthenticated = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store.select('auth')
      .pipe(map(appData => appData.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
    });
  }

  onSaveData() {
    this.store.dispatch(fromRecipe.storeRecipes());
  }

  onFetchData() {
    this.store.dispatch(fromRecipe.fetchRecipes());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.store.dispatch(fromAuth.logout());
  }
}
