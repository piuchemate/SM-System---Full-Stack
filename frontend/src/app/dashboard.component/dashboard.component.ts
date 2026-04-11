import { Component } from '@angular/core';

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
