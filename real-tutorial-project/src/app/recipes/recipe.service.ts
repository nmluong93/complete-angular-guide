import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  constructor(private store: Store<fromShoppingList.AppState>)
  {}

  private recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(ShoppingListActions.addIngredients({payload: ingredients}));
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
