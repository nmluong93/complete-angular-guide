import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') signUpForm: NgForm;
  genders = ['male', 'female'];
  // onSubmit(f: NgForm): void {
  //   console.log(f);
  // }
  defaultQuestion = 'pet';
  answer: string;

  suggestUserName(): void {
    const suggestedName = 'Superuser';
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   gender: this.genders[0],
    //   answer: 'Cat'
    // });

    this.signUpForm.form.patchValue({
      // will patch value of a control only
      userData: {
        username: suggestedName
      }
    });

    this.signUpForm.form.patchValue({
      secret: 'pet'
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }
}
