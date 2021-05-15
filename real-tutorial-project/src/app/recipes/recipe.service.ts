import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    constructor(private slService: ShoppingListService) {}

    selectedRecipe = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Tasty Pizza', 'A super-tasty Pizza - just awesome!', 'https://www.citypassguide.com/media/slideshow/best-pizza-in-ho-chi-minh-city.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('Butter', 2)
          ]),
        new Recipe('Curry', 'Strange curry', 'https://www.inspiredtaste.net/wp-content/uploads/2021/03/Chicken-Curry-Recipe-3-1200.jpg',
          [
            new Ingredient('Secret one', 1),
            new Ingredient('Curry powder', 2)
          ])
    ];

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
