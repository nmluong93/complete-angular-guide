import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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

        if (i === 2) {
          observer.complete();
        }
        if (i > 3) {
          observer.error(new Error('Error occurs'));
        }
        i++;
      }, 1000);
    });

    // OPERATOR
    customedObs

    this.subscriber = customedObs
      .pipe(filter(d => d > 0),
        map((data: number) => {
        return 'Round ' + (data + 1);
      }))
      .subscribe(data => {
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
