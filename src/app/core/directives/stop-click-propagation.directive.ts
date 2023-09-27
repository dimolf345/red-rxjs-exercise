import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopClickPropagation]',

})
export class StopClickPropagationDirective {
  
 
  @HostListener("click", ['$event'])
  onClick(event: Event) : void {
    event.stopPropagation()
  }
}
