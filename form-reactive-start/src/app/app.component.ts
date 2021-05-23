import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenNames = ['Anna', 'Christ'];
  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        // wrap the key in the quotation marks to make them can not be modified accidentally
        'username': new FormControl(null,
          [Validators.required,
            this.forbiddenNameValidator.bind(this) // use bind(this) because this validator will be called by Angular not
            // inside our class.
          ]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      gender: new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    });

  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  addHobby() {
    const formControl = new FormControl(null, Validators.required);
    (this.signUpForm.get('hobbies') as FormArray).push(formControl);
    // can be like this as well (<FormArray> this.signUpForm.get('hobbies'))
  }

  getHobbyFormArray() {
    return this.signUpForm.get('hobbies') as FormArray;
  }

  forbiddenNameValidator(control: FormControl): { [s: string]: boolean } /*Key is string type and value is boolean*/ {
    if (this.forbiddenNames.indexOf(control.value) >= 0) {
      return { 'nameIsForbidden': true };
    }
    // return {'nameIsForbidden': false}; => this is not correct, for validation of a control, just return null to make it valid.
    return null;
  }
}
