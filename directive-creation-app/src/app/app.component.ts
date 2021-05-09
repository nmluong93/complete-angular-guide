import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'directive-creation-app';

  oddNumber = false;

  oddNumbers : number [] = [1,3,5,7];
  evenNumbers : number[] = [2,4,6];

}
