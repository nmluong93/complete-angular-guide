import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input() set appUnless(val : boolean) { // this property must has the same name as the directive selector
    if (!val) {
      this.viewRef.createEmbeddedView(this.templateRef);
    } 
    else {
      this.viewRef.clear();
    }
  }

  constructor(private templateRef : TemplateRef<any>, private viewRef: ViewContainerRef) { }

}
