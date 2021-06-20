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
    // Since user of AuthService is a BehaviorSubject so we can use this to listen to the latest user which was emitted before,
    // no need to require the user is emitted right now (but use the latest emitted value/user)
    return this.authService.user
      .pipe(
        // only get the first value then automatically unsubscribe.
        take(1),
        // This exhaustMap is to wait for the first observable $user emitted change then continue with the new observable
        // of HTTP response.
        exhaustMap(user => {
          // This means whenever the first user emitted, then we will return the second observable => Http's response.

          // User token attached in the request
          // for Firebase, we attache the token in the request as a query parameter but other APIs we usually attach it in the
          // header
          return this.httpClient.get<Recipe[]>(DataStorageService.RECIPE_URL,
            {
              params: new HttpParams().set('auth', user.token as string)
            });
        }),
        map(recipes => {
          // map to Recipe again to prevent the undefined ingredient in recipe from DB => broken.
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
          this.recipeService.updateRecipes(recipes);
        })
      );
  }

}
