import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private inputElement: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 100);
  }

}
