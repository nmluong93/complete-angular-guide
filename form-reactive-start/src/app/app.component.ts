import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];

  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        // wrap the key in the quotation marks to make them can not be modified accidentally
        'username': new FormControl(null, Validators.required),
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

}
