import { Component, HostListener, NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { RouterOutlet } from "@angular/router";
import { StudManagementComponent}  from './stud-management/stud-management.component';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // root now hosts the router outlet; DashboardComponent acts as the layout
}
