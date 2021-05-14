import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListComponent } from '../shopping-list.component';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static : false}) nameInputElement: ElementRef;
  @ViewChild('amountInput', {static : false}) amountInputElement: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd() {
    const name = this.nameInputElement.nativeElement.value;
    const amount = this.amountInputElement.nativeElement.value;
    this.slService.addIngredient(new Ingredient(name, amount));
  }
}
