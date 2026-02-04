
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import * as powerbi from 'powerbi-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.css']  // reuse app-level styles for layout
})
export class DashboardComponent {
  // Layout container for sidebar + routed pages
}