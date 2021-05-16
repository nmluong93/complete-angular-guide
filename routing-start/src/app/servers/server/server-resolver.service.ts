import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ServerResolverService implements Resolve<Server> {

  constructor(private serverService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    const id = +route.params['id'];
    return this.serverService.getServer(id);
  }

}

interface Server {
  id: number;
  name: string;
  status: string;
}
