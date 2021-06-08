import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    // because of this slice() => any change in ingredients didn't reflect to the getIngredients() result before
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.notifyDataChanged();
  }

  addIngredients(ingredients: Ingredient []) {
    if (ingredients.length === 0) {
      return;
    }
    // for (const ingredient of ingredients) {
    //  this.ingredients.push(ingredient);
    // }
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredients.push(...ingredients);
    this.notifyDataChanged();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.notifyDataChanged();
  }

  notifyDataChanged() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.notifyDataChanged();
  }
}
