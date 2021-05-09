import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  // lesson : https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656172#questions/8025650
  constructor(private eleRef : ElementRef, private render2 : Renderer2) { }

  ngOnInit() {
    // this.render2.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseenter') mouseover(eventData : Event) {
    this.render2.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseleave') mouseleave(eventData : Event) {
    // mouseleave is an official event of Element in DOM
    this.render2.setStyle(this.eleRef.nativeElement, 'background-color', 'transparent');
  }

}
