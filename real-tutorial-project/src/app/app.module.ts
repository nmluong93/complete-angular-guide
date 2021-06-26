import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import {AuthModule} from './auth/auth.module';
import {LoggingService} from './logging.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  // the same as providedIn: 'root' of the service decorator
  providers: [LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
