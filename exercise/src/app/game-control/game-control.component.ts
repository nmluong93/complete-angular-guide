import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  interval : any;
  @Output() intervalFired = new EventEmitter<number>();
  lastNumber = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame () {
    this.interval = setInterval(() => {
      this.lastNumber ++;
      this.intervalFired.emit(this.lastNumber);
    }, 1_000);
  }

  onPauseGame() {
    clearInterval(this.interval);
  }
}
