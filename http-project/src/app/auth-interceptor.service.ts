import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      headers: req.headers.append('Auth', 'key')
    });
    console.log('AuthInterceptorService called');
    return next.handle(modifiedReq)
      .pipe(tap(evt => {
        console.log(evt);
        if (evt.type === HttpEventType.Response) {
          console.log(`Response arrives in HTTP interceptor ${evt.body}`);
        }
      }));
  }

}
