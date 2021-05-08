import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static : false}) nameInputElement: ElementRef;
  @ViewChild('amountInput', {static : false}) amountInputElement: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    const name = this.nameInputElement.nativeElement.value;
    const amount = this.amountInputElement.nativeElement.value;

    this.ingredientAdded.emit(new Ingredient(name, amount));
  }
}
