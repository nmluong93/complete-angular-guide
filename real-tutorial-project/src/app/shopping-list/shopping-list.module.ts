import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';
import {DropdownDirective} from '../shared/dropdown.directive';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingListRoutingModule
  ],
  // exports: [
  //   ShoppingListComponent,
  //   ShoppingEditComponent
  // ]
})
export class ShoppingListModule {

}
