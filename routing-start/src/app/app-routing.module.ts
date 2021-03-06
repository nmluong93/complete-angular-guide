import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolverService } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users' /* localhost:4200/users */, component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  // { path: 'users/:id/:name', component: UserComponent /*not UsersComponent*/ },
  // { path: 'servers' /* localhost:4200/servers */, component: ServersComponent },
  // { path: 'servers/:id', component: ServerComponent },
  // { path: 'servers/:id/edit', component: EditServerComponent },
  {
    path: 'servers',
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolverService } },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService] }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' } // this must be the last one

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
