import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(d => {
        // the 'server' must be the same in routing module 'resolve: { server: ServerResolverService }'
        this.server = d['server'];
    });
   /* // add + to covert this id string to number type
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.route.params
      .subscribe(params => {
        const id1 = +params['id'];
        this.server = this.serversService.getServer(id1);
      });*/
  }

  onEdit() {
    // Since we are already at ***/servers/id
    this.router.navigate(['edit'], {queryParamsHandling: 'preserve', relativeTo: this.route});
  }
}
