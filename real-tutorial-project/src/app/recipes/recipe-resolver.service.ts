import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {Observable, of} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as fromRecipe from '../recipes/store/recipe.action';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromApp.AppState>,
              private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipe')
      .pipe(
        take(1),
        map(recipeState => {
          return recipeState.recipes;
        }),
        switchMap(recipes => {
          if (recipes.length === 0) {
            this.store.dispatch(fromRecipe.fetchRecipes());
            return this.actions$.pipe(
              ofType(fromRecipe.SET_RECIPES), take(1));
          } else {
            return of(recipes);
          }
        }));
  }
}
