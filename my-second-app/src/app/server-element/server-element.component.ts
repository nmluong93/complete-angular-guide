import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit,
 OnChanges,
  DoCheck,
   AfterContentInit,
   AfterContentChecked,
   AfterViewInit,
   AfterViewChecked,
   OnDestroy {

  @Input('srvElement') element! : {type : string, name : string, content: string};
  @Input() name : string = '';
  @ViewChild('heading', {static:true}) heading!: ElementRef;

  constructor() { 
    this.log("Constructor called");
  }
  ngOnDestroy(): void {
    this.log("ngOnDestroy called!");
  }
  ngAfterViewChecked(): void {
    this.log("ngAfterViewChecked called!");
  }
  ngAfterViewInit(): void {
    this.log("ngAfterViewInit called!");
    this.log("Text content ngAfterViewInit : " + this.heading.nativeElement.textContent);
  }
  ngAfterContentChecked(): void {
    this.log("ngAfterContentChecked called!");
  }
  ngAfterContentInit(): void {
    this.log("ngAfterContentInit called!");
  }
  ngDoCheck(): void {
    this.log("ngDoCheck called!");
  }
  
  log(msg: Object) {
    console.log(msg);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.log("ngOnChanges called");
    this.log("Simple changes");
    this.log(changes);
  }
  
  ngOnInit(): void {
    this.log("ngOnInit called");
    this.log("Text content ngOnInit : " + this.heading.nativeElement.textContent);
  }

}
