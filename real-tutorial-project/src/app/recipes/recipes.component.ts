import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {

  constructor(private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.loggingService.printLog('Hello from RecipesComponent OnInit');
  }

  ngOnDestroy() {

  }
}
