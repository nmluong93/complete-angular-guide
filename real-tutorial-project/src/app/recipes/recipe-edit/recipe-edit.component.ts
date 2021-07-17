import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as fromRecipe from '../store/recipe.action';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  recipe: Recipe;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.editMode = params.id != null;
      console.log('Recipe Edit component in edit mode :' + this.editMode);
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let description = '';
    let imagePath = '';
    const ingredientsControl = new FormArray([]);
    if (this.editMode) {
      this.subscription = this.store.select('recipe')
        .pipe(map(storeData => storeData.recipes.find((e, index) => this.id === index)))
        .subscribe(recipe => {
          if (recipe) {
            this.recipe = recipe;
            recipeName = this.recipe.name;
            description = this.recipe.description;
            imagePath = this.recipe.imagePath;
            if (this.recipe.ingredients) {
              for (const ingredient of this.recipe.ingredients) {
                ingredientsControl.push(new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
                }));
              }
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: ingredientsControl
    });
  }

  get getIngredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(fromRecipe.updateRecipe(
        {
          payload:
            {index: this.id, recipe: this.recipeForm.value}
        }));
    } else {
      this.store.dispatch(fromRecipe.addRecipe({payload: this.recipeForm.value}));
    }
    this.recipeForm.reset();
    this.onNavigateBack();
  }

  onNavigateBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
    }));
  }

  onDeleteIngredient(i: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
