import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  // lesson : https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656172#questions/8025650
  constructor(private eleRef : ElementRef, private render2 : Renderer2) { }

  ngOnInit() {
    this.render2.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
  }

}
