import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  subscriber: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LoggingService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscriber = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingrs: Ingredient[]) => this.ingredients = ingrs
      );
    this.loggingService.printLog('Hello from ShoppingListComponent OnInit');
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
