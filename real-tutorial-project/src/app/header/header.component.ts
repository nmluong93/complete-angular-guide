import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as fromAuth from '../auth/store/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;

  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
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
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      // just to trigger HTTP request executed.
      .subscribe(e => console.log(e));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.store.dispatch(fromAuth.logout());
  }
}
