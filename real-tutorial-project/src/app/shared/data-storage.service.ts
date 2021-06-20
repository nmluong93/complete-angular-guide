import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  static RECIPE_URL = 'https://ng-recipe-course-4d04f-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(DataStorageService.RECIPE_URL, recipes)
      .subscribe(rs => {
        console.log(rs);
      });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(DataStorageService.RECIPE_URL
    ).pipe(
      map(recipes =>
        recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        })
      ),
      tap(recipes => {
        this.recipeService.updateRecipes(recipes);
      })
    );
  }

}
