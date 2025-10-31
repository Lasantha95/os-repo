// angular import
import { Component, HostListener, output } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavContentComponent } from './nav-content/nav-content.component';

@Component({
  selector: 'app-navigation',
  imports: [SharedModule, NavLogoComponent, NavContentComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // public props
  NavCollapse = output();
  NavCollapsedMob = output();
  navCollapsed: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;

  // constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 992 && document.querySelector('app-navigation.pcoded-navbar').classList.contains('navbar-collapsed')) {
      document.querySelector('app-navigation.pcoded-navbar').classList.remove('navbar-collapsed');
    } else if (this.windowWidth >= 992 && this.navCollapsed) {
      document.querySelector('app-navigation.pcoded-navbar').classList.add('navbar-collapsed');
    }
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}
