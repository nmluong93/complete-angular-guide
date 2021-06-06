import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoginInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('LoginInterceptorService called');
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req)
      .pipe(tap(evt => {
        console.log(evt);
        if (evt.type === HttpEventType.Response) {
          console.log(`Response arrives in login HTTP interceptor ${evt.body}`);
        }
      }));
  }

}
