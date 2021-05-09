import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]' // so that we don't need to add square brackets in the element for this directive appBasicHighlight
})
export class BasicHighlightDirective implements OnInit {

    constructor(private elementRef : ElementRef ) {}

    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}