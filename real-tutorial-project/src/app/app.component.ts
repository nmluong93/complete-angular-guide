import {Component, OnInit} from '@angular/core';
import {LoggingService} from './logging.service';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as fromAuth from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'real-tutorial-project';

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
    ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromAuth.autoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit ');
  }

}
