import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
// lesson : https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656172#questions/8025650
export class BetterHighlightDirective implements OnInit{
  
  @Input() defaultColor = 'transparent';
  @Input() highlightColor = 'red';
  constructor(private eleRef : ElementRef, private render2 : Renderer2) { }

  @HostBinding('style.backgroundColor') backgroundColor : string;

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    // this.render2.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseenter') mouseover(eventData : Event) {
    // this.render2.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData : Event) {
    // mouseleave is an official event of Element in DOM
    // this.render2.setStyle(this.eleRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

}
