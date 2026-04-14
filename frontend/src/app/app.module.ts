import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudManagementComponent } from './stud-management/stud-management.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
// import { TeacherManagementComponent } from './staff-management/staff-management.component';
import { ClassManagementComponent } from './class-management/class-management.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import {  NavBarComponent } from './navbar/navbar.component';
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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StudManagementComponent,
    StaffManagementComponent,
    ClassManagementComponent,
    // AttendanceComponent,
    ReportsComponent,
    SettingsComponent,
    CardTileComponent,
    DashboardComponent,
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
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
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