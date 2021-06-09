import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {
  }

  private recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  updateRecipe(id: number, value: Recipe) {
    this.recipes[id] = value;
    this.onRecipesChange();
  }

  addRecipe(value: Recipe) {
    this.recipes.push(value);
    this.onRecipesChange();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.onRecipesChange();
  }

  onRecipesChange() {
    this.recipeChanged.next(this.recipes);
  }

  updateRecipes(rs: Recipe[]) {
    this.recipes = rs;
    this.onRecipesChange();
  }
}
