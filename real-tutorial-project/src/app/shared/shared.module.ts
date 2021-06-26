import {NgModule} from '@angular/core';
import {AlertComponent} from './alert/alert.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {PlaceholderDirective} from './placeholder.directive';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';
import {LoggingService} from "../logging.service";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  /*
    Since the shared module is imported by AppModule and ShoppingList module
    + in AppModule it is eager-loaded module => the LoggingService instance in this case is application-wide.
    + in ShoppingListModule, it is considered as lazy-loaded module => the LoggingService instance in this case only
      belongs to ShoppingListModule

     => This is the most programmatic bug
  */
  providers: [LoggingService]
})
export class SharedModule {

}
