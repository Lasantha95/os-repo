// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import
import { CardComponent } from './components/card/card.component';

// bootstrap import
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PermissionDirective } from './directive/permission.directive';
import { ToggleFullScreenDirective } from './directive/toggle-full-screen.directive';
import { FilterPipe } from './filters/filter-pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardComponent, NgbModule, NgScrollbarModule, NgbCollapseModule, PermissionDirective, ToggleFullScreenDirective, FilterPipe],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, CardComponent, NgbModule, NgScrollbarModule, NgbCollapseModule, PermissionDirective, ToggleFullScreenDirective, FilterPipe]
})
export class SharedModule {}
