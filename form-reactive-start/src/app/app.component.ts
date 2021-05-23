import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      // wrap the key in the quotation marks to make them can not be modified accidentally
      'username': new FormControl(null),
      email: new FormControl(null),
      gender: new FormControl('male')
    });

  }

}
