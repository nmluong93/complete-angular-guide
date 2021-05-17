import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  subscriber: Subscription;

  ngOnInit() {

    const customedObs = Observable.create(observer => {
      let i = 0;
      setInterval(() => {
        observer.next(i);
        i++;
        if (i === 2) {
          observer.complete();
        }
        if (i > 3) {
          observer.error(new Error('Error occurs'));

        }
      }, 1000);
    });

    this.subscriber = customedObs.subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(`Error occurs in Observable ${error}`);
        alert(error.message);
      },
      () => {
        alert('Complete');
      });

  }

}
