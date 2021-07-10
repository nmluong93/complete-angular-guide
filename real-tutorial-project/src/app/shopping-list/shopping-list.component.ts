import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
import {LoggingService} from '../logging.service';
import {Store} from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as fromShoppingListAction from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private loggingService: LoggingService,
              // the same as in app.module.ts =>  StoreModule.forRoot({shoppingList: shoppingListReducer})
              //  and { ingredients: Ingredient[] } is return type of shoppingListReducer
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscriber = this.shoppingListService.ingredientsChanged
    //   .subscribe(
    //     (ingrs: Ingredient[]) => this.ingredients = ingrs
    //   );
    this.loggingService.printLog('Hello from ShoppingListComponent OnInit');
  }

  ngOnDestroy() {
  }

  onEditItem(id: number) {
    // this.shoppingListService.startedEditing.next(id);
    this.store.dispatch(fromShoppingListAction.startEdit({payload: id}));
  }
}
