import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {LoggingService} from './logging.service';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as fromAuth from './auth/store/auth.action';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'real-tutorial-project';

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: any
    ) {
  }

  ngOnInit(): void {
    /**
     * Since we use Angular Universal, we will let the first page pre-loaded in the server side (rendered from server
     * side ) then the user initially accesses the page will not wait for the page downloaded from server
     * (e.g JS files, etc), this will increase user experience.
     */
    if (isPlatformBrowser(this.platformId)) {
      /**
       * In this action dispatch, we will use localStorage to do the auto-login, but the LocalStorage is not available
       * in server side, that is why we only do this in the browser.
       */
      this.store.dispatch(fromAuth.autoLogin());
    }
    this.loggingService.printLog('Hello from AppComponent ngOnInit ');
  }

}
