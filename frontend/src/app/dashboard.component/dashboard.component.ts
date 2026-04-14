import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../data.service';
import { OnInit } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

   role = 'Admin';
  welcomeText = 'Welcome, Admin';
  description = 'Manbage school data and administrative tasks';

  studentCount = 0;
  teacherCount = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts() {

    this.dataService.getStudents().subscribe((data: any) => {
      this.studentCount = data.length; // assuming data is an array of students
    });


    this.dataService.getStaffs().subscribe((data: any) => {
      this.teacherCount = data.length; // assuming data is an array of staff
    });

  }
  // Make tiles dynamic so `count` reflects latest values from async loads.
  get tiles() {
    return [
      {
        icon: 'assets/my-classes',
        title: 'Student Count',
        link: '/studentmanagement',
        count: this.studentCount
      },
      {
        icon: 'assets/icons/list.png',
        title: 'Staff Count',
        link: '/staffmanagement',
        count: this.teacherCount
      }
    ];
  }
}
