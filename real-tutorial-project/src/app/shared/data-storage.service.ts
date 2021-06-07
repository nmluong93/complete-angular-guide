import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {

  static RECIPE_URL = 'https://ng-recipe-course-4d04f-default-rtdb.firebaseio.com/recipes.json';
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.httpClient.put(DataStorageService.RECIPE_URL, recipes)
        .subscribe(rs => {
          console.log(rs);
        });
  }

  fetchRecipes() {
    this.httpClient.get(DataStorageService.RECIPE_URL)
      .subscribe(rs => {
        console.log(rs);
      });
  }
}
