import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from './data.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StudEntry, Students } from 'src/assets/Models/stud-entry';
import { FatherDetail, MotherDetail, StudEnroll, StudentDetail } from 'src/assets/Models/stud-enroll';

export interface UserData {
  id: number;
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
  role = 'Student Management';
  description = 'Access and manage your student information here.';


  displayedColumns: string[] = ['id', 'firstName', 'age', 'class', 'actions'];
  dataSource = new MatTableDataSource<Students>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('studentForm') studentForm!: NgForm;
  studEnroll!: StudEnroll;
  studId!: number;

  // track which row's action popover is open (id)
  activeRow: string | null = null;
  showForm = false;
  userForm: any;
  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.userForm = this.fb.group({ fName: [''], mName: [''], lname: [''], emailid: [''], phoneno: [''], name: [''], })
    this.dataService.postStudentData(this.userForm.value);
  }
  get f() {
    console.log(this.userForm);
    return this.userForm.controls;
  }
  ngOnInit() {
    this.loadStudents();


  }
  loadStudents() {
    this.dataService.getStudents().subscribe((res: StudEnroll) => {

      console.log("API Response:", res); // 👈 check this in console

      if (!res || !Array.isArray(res)) {
        console.error("Response is not an array");
        return;
      }

      const formatted = res.map((item: StudEnroll) => ({
        id: item.id,
        firstName: item.studentDetails[0].fName + ' ' + item.studentDetails[0].lName || '',
        age: item.studentDetails[0].dob || '',
        class: item.studentDetails[0].admissionClass || ''
      }));

      this.dataSource.data = formatted.map((s: any) => new Students(s));
    });
  }

  saveForm(form: any) {
    
    if (!form || form.invalid) {
      
      alert("Please fill all required fields");
      return;
    }
    if (this.studEnroll.id == null) {
      console.log("Inserting new entry");
      this.dataService.postStudentData(this.studEnroll).subscribe({
        next: (res) => {
          console.log("Saved Successfully", res);

          this.loadStudents();   // refresh table
          this.showForm = false; // close form
        },
        error: (err) => {
          console.error("Error:", err);
        }
      });
    }
    else {
      console.log("Updating entry");

      this.dataService.updateStudentData(this.studEnroll.id, this.studEnroll).subscribe({
        next: (res) => {
          console.log("Saved Successfully", res);

          this.loadStudents();   // refresh table
          this.showForm = false; // close form
        },
        error: (err) => {
          console.error("Error:", err);
        }
      });
    }
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



  onEdit(row: UserData) {

    const id = row.id;

    this.dataService.getStudentsbyID(id).subscribe(res => {

      console.log("Edit Data:", res);
      // Open form
      this.showForm = true;
      // Assign full object to form model
      this.studEnroll = res;
    });

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
    this.studentForm.resetForm();
    // optional: reset form state here
  }

  public religions = [
    { value: 'hindu', label: 'Hindu', castes: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra'] },
    { value: 'muslim', label: 'Muslim', castes: ['Sunni', 'Shia'] },
    { value: 'christian', label: 'Christian', castes: ['Catholic', 'Protestant', 'Orthodox'] },
    { value: 'sikh', label: 'Sikh', castes: ['Jat', 'Khatri', 'Arora'] },
    { value: 'other', label: 'Other', castes: [] }
  ];

  selectedReligion: any = null;
  castes: string[] = [];

  onReligionChange(value: string) {
    this.selectedReligion = this.religions.find(r => r.value === value);
    this.castes = this.selectedReligion ? this.selectedReligion.castes : [];
  }

  public languages: string[] = [
    'English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic', 'Portuguese'
  ];

  showDisabilityDetails = false;

  onDisabilityChange(value: string) {
    this.showDisabilityDetails = value === 'Yes';
  }
}

