// ...existing code...
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudManagementComponent } from './stud-management/stud-management.component';
import { TeacherManagementComponent } from './teach-management/teach-management.component';
import { ClassManagementComponent } from './class-management/class-management.component';
// import { AttendanceComponent } from './attendance/attendance.component';
import { SettingsComponent } from './settings/settings.component';
import { NavBarComponent } from './navbar/navbar.component';
import { CardTileComponent } from './card-tile/card-tile.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: NavBarComponent, // layout
    children: [
      { path: '', component: DashboardComponent }, // <-- default child view
      { path: 'card', component: CardTileComponent }, // <-- default child view
      { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
      { path: 'studentmanagement', component: StudManagementComponent },
      { path: 'teachermanagement', component: TeacherManagementComponent },
      { path: 'classmanagement', component: ClassManagementComponent },
      { path: 'settings', component: SettingsComponent }    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}