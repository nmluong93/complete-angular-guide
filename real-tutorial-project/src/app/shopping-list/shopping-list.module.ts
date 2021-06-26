import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {FormsModule} from '@angular/forms';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';
import {SharedModule} from '../shared/shared.module';
import {LoggingService} from '../logging.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule
  ],
  // exports: [
  //   ShoppingListComponent,
  //   ShoppingEditComponent
  // ]
  // Since this is a lazy-loaded module then this service instance will be different from others - its own instance
  providers: [LoggingService]
})
export class ShoppingListModule {

}
