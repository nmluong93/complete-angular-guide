import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  serverElements = [{ type: 'server', name: 'Test server', content: 'just a test' }];

  title = 'my-second-app';


  onServerAdded(server: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: server.serverName,
      content: server.serverContent
    })
  }

  onBlueprintAdded(blueprint: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprint.serverName,
      content: blueprint.serverContent
    })
  }

  onChangeFirst(){
    this.serverElements[0].name = "Changes";
  }
  onDestroyFirst(){
    this.serverElements.splice(0, 1);// remove first element => empty then
  }
}
