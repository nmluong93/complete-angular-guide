import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from 'src/app/shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f')
  shoppingListForm: NgForm;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(index => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  onSubmit(f: NgForm) {
    const ingredient = new Ingredient(f.value.name, f.value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
