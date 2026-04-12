import { Component } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
// dynamic data (can be changed anytime)
  role = 'Admin';
  welcomeText = 'Welcome, Admin';
  description = 'Manbage school data and administrative tasks';

  tiles = [
    {
      icon: 'assets/my-classes',
      title: 'Student Management',
      subtitle: 'Admissions, records',
      link: '/studentmanagement'
    },
    {
      icon: 'assets/icons/list.png',
      title: 'Teacher Management',
      subtitle: 'Information, schedules',
      link: '/teachermanagement'
    }
  ];
}
