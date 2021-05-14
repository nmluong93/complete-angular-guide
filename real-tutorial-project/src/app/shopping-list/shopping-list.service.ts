import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice(); // because of this slice() => any change in ingredients didn't refect to the getIngredients() result before
  }

  addIngredient(ingr: Ingredient) {
    this.ingredients.push(ingr);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
