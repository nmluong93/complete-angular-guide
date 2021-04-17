import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowAddServer = false;
  serverCreatedStatus = '';
  serverName = 'Test server';
  serverCreated: boolean;
  
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.allowAddServer = true;
    }, 2_000);
  }

  onAddServer() {
    this.serverCreatedStatus = `Server was created! Name is ${this.serverName}` ;
    this.serverCreated = true;
  }

  onInputServerName(event : Event) {
    console.log(event);
    this.serverName = (<HTMLInputElement> event.target).value;
  }

}

