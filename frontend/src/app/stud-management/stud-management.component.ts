import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from './data.service';
import { StudEntry, Students } from 'src/assets/Models/stud-entry';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}


@Component({
  selector: 'app-stud-management',
  templateUrl: './stud-management.component.html',
  styleUrls: ['./stud-management.component.css']
})
export class StudManagementComponent {
  // dynamic data (can be changed anytime)
  role = 'Student';
  welcomeText = 'Welcome, Student';
  description = 'Access your classes and track your performance';


  displayedColumns: string[] = ['id', 'firstName',  'age', 'class'];
  dataSource = new MatTableDataSource<Students>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // track which row's action popover is open (id)
  activeRow: string | null = null;
  showForm = false;
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.dataService.getStudents().subscribe(res => {
      this.dataSource.data = res.students.map(s => new Students(s));
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // toggle action popover for a row
  toggleActions(id: string, event?: Event) {
    if (event) { event.stopPropagation(); } // prevent document click closures if used
    this.activeRow = this.activeRow === id ? null : id;
  }

  // handlers for action icons
  onEdit(row: UserData) {
    // implement edit logic
    console.log('Edit', row);
    // close popover
    this.activeRow = null;
  }

  onDelete(row: UserData) {
    // implement delete logic
    console.log('Delete', row);
    // close popover
    this.activeRow = null;
  }

  openAddForm() {
    this.showForm = true;
    // optional: reset form state here
  }

  closeForm() {
    this.showForm = false;
  }
}

