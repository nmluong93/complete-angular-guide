import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') onDropdownClick(eventData : Event) {
        this.isOpen = !this.isOpen;
    };

    constructor() { }

    ngOnInit(): void {
        
    }

    
}