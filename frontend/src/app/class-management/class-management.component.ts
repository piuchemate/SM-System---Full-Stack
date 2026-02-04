import { Component } from '@angular/core';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent {
// dynamic data (can be changed anytime)
  role = 'Admin';
  welcomeText = 'Welcome, Admin';
  description = 'Manbage school data and administrative tasks';

  tiles = [
    {
      icon: 'assets/my-classes',
      title: 'Student Management',
      subtitle: 'Admissions, records',
      link: '/class-stud'
    },
    {
      icon: 'assets/icons/list.png',
      title: 'Teacher Management',
      subtitle: 'Information, schedules',
      link: '/class-teach'
    }
  ];
}
