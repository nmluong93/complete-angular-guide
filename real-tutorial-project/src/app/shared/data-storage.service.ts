import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';

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
    this.httpClient.get<Recipe[]>(DataStorageService.RECIPE_URL)
      .pipe(map(recipes => {
        // map to Recipe again to prevent the null ingredient in recipe from DB => broken.
        return recipes.map(recipe => {
          return {... recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }))
      .subscribe(rs => {
        console.log(rs);
        this.recipeService.updateRecipes(rs);
      });
  }
}
