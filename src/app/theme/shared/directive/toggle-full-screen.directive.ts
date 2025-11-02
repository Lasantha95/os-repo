import { Directive, ElementRef, HostListener, Input, inject, input } from '@angular/core';
import screenfull from 'screenfull';

@Directive({
  selector: '[appToggleFullScreen]'
})
export class ToggleFullScreenDirective {
  appToggleFullScreen = input<string>();
  private el = inject(ElementRef);

  @HostListener('click')
  onClick() {
    if (!screenfull.isEnabled) return;

    const target = this.appToggleFullScreen()
      ? document.querySelector(this.appToggleFullScreen())
      : this.el.nativeElement;

    if (target) {
      if (screenfull.isFullscreen && screenfull.element === target) {
        screenfull.exit();
      } else {
        screenfull.request(target);
      }
    }
  }
}