import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute /*Currently navigated ROUTE*/) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // this will cause an error in console : main.js:1 ERROR Error: Uncaught (in promise): Error: Cannot match any routes.
    // URL Segment: 'servers/servers'
    // Because now we stay at route of ServersComponent ({relativeTo: this.route}) and try to add relative path 'servers'
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
