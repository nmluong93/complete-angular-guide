import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') form: NgForm;
  genders = ['male', 'female'];
  // onSubmit(f: NgForm): void {
  //   console.log(f);
  // }
  defaultQuestion = 'pet';
  answer: string;

  suggestUserName(): void {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    console.log(this.form);
  }
}
