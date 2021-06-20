import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.user.pipe(
      // only get the first value then automatically unsubscribe.
      take(1),
      // This exhaustMap is to wait for the first observable $user emitted change then continue with the new observable
      // of HTTP response.
      exhaustMap(user => {
        // This means whenever the first user emitted, then we will return the second observable => Http's response.

        // User token attached in the request
        // for Firebase, we attache the token in the request as a query parameter but other APIs we usually attach it in the
        // header
        if (!user) {
          return next.handle(req);
        }
        // Clone request and add params
        const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token as string) });
        return next.handle(modifiedReq);
      })
    );
  }
}
