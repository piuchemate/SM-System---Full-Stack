
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import * as powerbi from 'powerbi-client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../app.component.css']  // reuse app-level styles for layout
})
export class NavBarComponent {
  // Layout container for sidebar + routed pages
}