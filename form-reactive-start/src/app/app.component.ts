import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { log } from 'util';

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
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this))
      }),
      gender: new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    });

    this.signUpForm.statusChanges
      .subscribe(val => console.log('Status of form changes to ' + val));

    this.signUpForm.valueChanges
      .subscribe(val => console.log('Value of form changes to ' + val));
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

  /**
   * Asynchronous validator
   */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        }
        else {
          resolve(null);
        }
      }, 5000);
    });
  }
}
