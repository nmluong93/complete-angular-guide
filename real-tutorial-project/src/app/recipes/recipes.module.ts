import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  // In declarations part, a component must be declared 1 time (crossed-module too)
  // => you cannot declare RecipesComponent in both here and AppModule when you import this module to AppModule.
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  // We don't need to import the service since it is only required in AppModule
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ],
  // we don't need to export these components because they are only used internally - in the Recipes Module not the AppModule
  /* exports: [
     RecipesComponent,
     RecipeListComponent,
     RecipeDetailComponent,
     RecipeItemComponent,
     RecipeStartComponent,
     RecipeEditComponent
   ]*/
})
export class RecipesModule {

}
