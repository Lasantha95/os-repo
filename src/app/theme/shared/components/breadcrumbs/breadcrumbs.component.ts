// Angular Import
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

// project import
import { NavigationItem } from 'src/app/theme/layout/admin/navigation/navigation';
import { SharedModule } from '../../shared.module';
import { Api } from 'src/app/services/api';

interface titleType {
  // eslint-disable-next-line
  url: string | boolean | any | undefined;
  title: string;
  breadcrumbs: unknown;
  type: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  private route = inject(Router);
  private titleService = inject(Title);

  // public props
  @Input() type: string;

  navigations: NavigationItem[];
  breadcrumbList: string[] = [];
  navigationList!: titleType[];

  // constructor
  constructor(private api: Api) {
    // this.navigations = NavigationItems;
    this.type = 'theme1';
    this.setBreadcrumb();
    this.setNav();
  }

  setNav() {
    this.api.getCachedNav().subscribe(data => {
      this.navigations = data;
      console.log('Navigation:', data);
      this.updateBreadcrumb();
    });
  }
  // public method
  setBreadcrumb() {
    this.route.events.subscribe((router: Event) => {
      if (router instanceof NavigationEnd) {
        this.updateBreadcrumb();
      }
    });
  }

  updateBreadcrumb() {
    const activeLink = this.route.url;
    const breadcrumbList = this.filterNavigation(this.navigations, activeLink);
    this.navigationList = breadcrumbList;
    console.log('breadcrumbList:', breadcrumbList);

    const title = breadcrumbList[breadcrumbList.length - 1]?.title || 'Welcome';
    this.titleService.setTitle(title + ' | Berry Angular Admin Template');
  }

  filterNavigation(navItems: NavigationItem[], activeLink: string): titleType[] {
    for (const navItem of navItems) {
      if (navItem.type === 'item' && 'url' in navItem && navItem.url === activeLink) {
        return [
          {
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          }
        ];
      }
      if ((navItem.type === 'group' || navItem.type === 'collapse') && 'children' in navItem) {
        const breadcrumbList = this.filterNavigation(navItem.children!, activeLink);
        if (breadcrumbList.length > 0) {
          breadcrumbList.unshift({
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          });
          return breadcrumbList;
        }
      }
    }
    return [];
  }
}
