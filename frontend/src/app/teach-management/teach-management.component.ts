import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Entry, Entries } from 'src/assets/Models/entry';
import {  EmergencyDetail,  } from 'src/assets/Models/teach-enroll';
import { TeachEnroll, TeacherDetail } from 'src/assets/Models/teach-enroll';
import { StudFormData } from 'src/assets/Models/StudFormData';

export interface UserData {
  id: number;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-teach-management',
  templateUrl: './teach-management.component.html',
  styleUrls: ['./teach-management.component.css']
})

export class TeacherManagementComponent {

  role = 'Teacher Management';
  description = 'Access and manage your teacher information here.';


  displayedColumns: string[] = ['id', 'firstName', 'dob', 'class', 'actions'];
  dataSource = new MatTableDataSource<Entries>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('teacherForm') teacherForm!: NgForm;
  teachEnroll!: TeachEnroll;
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
    this.dataService.postTeacherData(this.userForm.value);
  }
  get f() {
    console.log(this.userForm);
    return this.userForm.controls;
  }
  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.dataService.getTeachers().subscribe((res: TeachEnroll) => {

      console.log("API Response:", res); // 👈 check this in console

      if (!res || !Array.isArray(res)) {
        console.error("Response is not an array");
        return;
      }

      const formatted = res.map((item: TeachEnroll) => ({
        id: item.id,
        firstName: item.teacherDetails[0].fName + ' ' + item.teacherDetails[0].lName || '',
        dob: item.teacherDetails[0].dob || '',
        class: item.teacherDetails[0].joiningClass || ''
      }));

      this.dataSource.data = formatted.map((s: any) => new Entries(s));
    });
  }

  saveForm(form: any) {
    

    if (!form || form.invalid) {
      alert("Please fill all required fields");
      form.control.markAllAsTouched();  // ✅ trigger all validations
      return;
    }

    // To show modal after form comlition
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('exampleModa3')
    );
    modal.show();

    if (this.teachEnroll.id == null) {
      console.log("Inserting new entry");
      this.dataService.postTeacherData(this.teachEnroll).subscribe({
        next: (res) => {
          console.log("Saved Successfully", res);

          this.loadTeachers();   // refresh table
          this.showForm = false; // close form
        },
        error: (err) => {
          console.error("Error:", err);
        }
      });
    }
    else {
      console.log("Updating entry");

      this.dataService.updateTeacherData(this.teachEnroll.id, this.teachEnroll).subscribe({
        next: (res) => {
          console.log("Saved Successfully", res);

          this.loadTeachers();   // refresh table
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

    this.dataService.getTeachersbyID(id).subscribe(res => {

      console.log("Edit Data:", res);
      // Open form
      this.showForm = true;
      // Assign full object to form model
      this.teachEnroll = res;
    });
    this.GetTeachersInputData();
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
        this.loadTeachers(); // Refresh the student list
      }
    );
  }

  openAddForm() {
    this.showForm = true;

    // 1. Reset the validation state
    if (this.teacherForm) {
      this.teacherForm.resetForm();
    }

    // 2. Initialize the model to match structure
    this.teachEnroll = {
      id: null, // Important for save vs update logic
      teacherDetails: [new TeacherDetail()],
      emergencyDetails: [new EmergencyDetail()]
    };

    this.castes = [];

    // 4. Call the API
    this.GetTeachersInputData();
  }

  GetTeachersInputData() {
    this.dataService.getTeachersFormData().subscribe({
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
    this.teachEnroll.teacherDetails[0].category = '';
  }

  onDisabilityChange(value: string) {
    this.showDisabilityDetails = value === 'Yes';
  }
}

