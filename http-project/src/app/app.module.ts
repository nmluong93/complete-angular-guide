import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoginInterceptorService } from './login.interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [PostService,
    // the order of interceptors are important.
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoginInterceptorService,
        multi: true
      }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
