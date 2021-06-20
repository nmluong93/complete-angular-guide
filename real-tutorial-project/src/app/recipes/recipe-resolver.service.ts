import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private  recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    if (this.recipeService.getRecipes().length > 0) {
      return this.recipeService.getRecipes();
    }
    return this.dataStorageService.fetchRecipes();
  }

}