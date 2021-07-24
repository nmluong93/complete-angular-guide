import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

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
  // this PreloadAllModules strategy tells Angular that, when we are at the first module - may be the eager loaded one
  // then the Shopping-List and Recipe modules are already loaded - available => don't see any delay
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
