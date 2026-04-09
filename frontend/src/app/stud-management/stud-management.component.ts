import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from './data.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StudEntry, Students } from 'src/assets/Models/stud-entry';
import { FatherDetail, MotherDetail, StudEnroll, StudentDetail } from 'src/assets/Models/stud-enroll';
import { StudFormData } from 'src/assets/Models/StudFormData';

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


  displayedColumns: string[] = ['id', 'firstName', 'dob', 'class', 'actions'];
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
  religions: any;
  languages: any;
  castes: any;
  classes: any;
  documents: any;
  showDisabilityDetails = false;
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
        dob: item.studentDetails[0].dob || '',
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
this.GetStudentsInputData();
    this.activeRow = null;
  }


  onDelete(row: UserData) {
    // implement delete logic
    console.log('Delete', row);
    // close popover
    this.activeRow = null;
    this.dataService.deleteStudentData(row.id).subscribe(
      () => {
        console.log('Student deleted successfully!');
        this.loadStudents(); // Refresh the student list
      }
    );
  }

  openAddForm() {
    this.showForm = true;

    // 1. Reset the validation state
    if (this.studentForm) {
      this.studentForm.resetForm();
    }

    // 2. Initialize the model to match structure
    this.studEnroll = {
      id: null, // Important for save vs update logic
      studentDetails: [new StudentDetail()],
      fatherDetails: [new FatherDetail()],
      motherDetails: [new MotherDetail()]
    };

    this.castes = [];

    // 4. Call the API
    this.GetStudentsInputData();
  }

  GetStudentsInputData() {
    this.dataService.getStudentsFormData().subscribe({
      next: (res: any) => {
        console.log("Form Data Received:", res);

        this.religions = res?.religions || [];
        this.languages = res?.languages || [];
        this.classes = res?.classes || [];
        this.documents = res?.documents || [];
      },
      error: (err) => console.error("API Error:", err)
    });
  }

  onReligionChange(value: string) {
    // We filter from the local 'this.religions' array already fetched
    const selected = this.religions.find((r: any) => r.value === value);
    this.castes = selected ? selected.castes : [];

    // Optional: Reset the category selection when religion changes
    this.studEnroll.studentDetails[0].category = '';
  }

  onDisabilityChange(value: string) {
    this.showDisabilityDetails = value === 'Yes';
  }
}

