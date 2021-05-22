import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') form: NgForm;

  // onSubmit(f: NgForm): void {
  //   console.log(f);
  // }
  defaultQuestion = 'pet';

  suggestUserName(): void {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    console.log(this.form);
  }
}
