import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as fromRecipe from './recipe.action';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';

export const RECIPE_URL = 'https://ng-recipe-course-4d04f-default-rtdb.firebaseio.com/recipes.json';

@Injectable()
export class RecipeEffect {

  constructor(private actions$: Actions<fromRecipe.recipeActions>,
              private httpClient: HttpClient,
              private store: Store<fromApp.AppState>) {
  }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(fromRecipe.FETCH_RECIPES),
    switchMap(() => {
      return this.httpClient.get<Recipe[]>(RECIPE_URL);
    }),
    map(recipes =>
      recipes
        .map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
    ),
    map(recipes => {
      return fromRecipe.setRecipes({payload: recipes});
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(fromRecipe.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([action, recipesState]) => {
      return this.httpClient.put(RECIPE_URL, recipesState.recipes);
    }));
}
