import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {map, switchMap} from 'rxjs/operators';
import * as fromRecipe from '../store/recipe.action';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;
  private id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.route.params
      .pipe(map(params => +params.id),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipe');
        }),
        map(storeData => {
          return storeData.recipes.find((e, index) => index === this.id);
        }))
      .subscribe(recipe => {
        if (recipe) {
          this.recipe = recipe;
        }
      });
  }

  addIngredientsToShoppingList() {
    this.store.dispatch(fromShoppingList.addIngredients({payload: this.recipe.ingredients}));
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    this.store.dispatch(fromRecipe.deleteRecipe({payload: this.id}));
    this.router.navigate([''], {relativeTo: this.route});
  }
}

