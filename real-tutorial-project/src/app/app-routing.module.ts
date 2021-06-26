import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    // lazily load the recipes module : path to file and #ClassName
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},

    {
      path: 'shopping-list',
      loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
