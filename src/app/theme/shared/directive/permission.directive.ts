import { Directive, input, output, effect } from "@angular/core";

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {
  readonly moduleType = input<string>();
  readonly isPermitted = output<boolean>();

  constructor() {
    effect(() => {
      console.log('Directive moduleType changed:', this.moduleType());
      this.checkPermission();
    });
  }

  checkPermission() {
    const allowed = this.moduleType() === 'admin';
    this.isPermitted.emit(allowed);
  }
}