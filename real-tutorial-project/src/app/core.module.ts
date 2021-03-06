import {NgModule} from '@angular/core';
import {RecipeResolverService} from './recipes/recipe-resolver.service';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';

@NgModule({
  providers: [
    RecipeResolverService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    // LoggingService => provided in this EAGER-LOADED module => this will be application wide used
  ]
})
export class CoreModule {

}
