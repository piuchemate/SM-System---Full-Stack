// ...existing code...
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudManagementComponent } from './stud-management/stud-management.component';
import { TeacherManagementComponent } from './teach-management/teach-management.component';
import { ClassManagementComponent } from './class-management/class-management.component';
// import { AttendanceComponent } from './attendance/attendance.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassStudComponent } from './class-management/class-stud/class-stud.component';
import { ClassTeachComponent } from './class-management/class-teach/class-teach.component';
import { CardTileComponent } from './card-tile/card-tile.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, // layout
    children: [
      { path: '', component: CardTileComponent }, // <-- default child view
      { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
      { path: 'studentmanagement', component: StudManagementComponent },
      { path: 'teachermanagement', component: TeacherManagementComponent },
      { path: 'classmanagement', component: ClassManagementComponent },
      // { path: 'attendance', component: AttendanceComponent },
      // { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'class-stud', component: ClassStudComponent },
      { path: 'class-teach', component: ClassTeachComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}