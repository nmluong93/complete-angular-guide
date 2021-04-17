import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles :[
    `
      .online {
        color : white;
      }
    `
  ]
})
export class ServerComponent implements OnInit {

  id = 10;
  serverStatus = 'offline';
  
  ngOnInit(): void {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getColor() {
    return this.serverStatus === 'offline' ? 'red' : 'green';
  }
}