import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudManagementComponent } from './stud-management/stud-management.component';
import { TeachManagementComponent } from './teach-management/teach-management.component';
import { ClassManagementComponent } from './class-management/class-management.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardTileComponent } from './card-tile/card-tile.component';
import { CommonModule } from '@angular/common';
import { MsalModule, MsalGuard } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StudManagementComponent,
    TeachManagementComponent,
    ClassManagementComponent,
    // AttendanceComponent,
    ReportsComponent,
    SettingsComponent,
    CardTileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    
    CommonModule,
    AppRoutingModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: "YOUR_AZURE_AD_APP_CLIENT_ID",
          authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
          redirectUri: "http://localhost:4200/"
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: true
        }
      }),
      {
        interactionType: InteractionType.Popup,
        authRequest: {
          scopes: ["https://app.powerbi.com/dashboardEmbed?dashboardId=XXX&groupId=YYY&allowThirdPartyCookies=true"]
        }
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map()
      }
    )
  ],
  providers: [MsalGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }