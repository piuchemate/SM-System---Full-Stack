import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Entry, Entries } from 'src/assets/Models/entry';
import { EmergencyDetail, } from 'src/assets/Models/staff-enroll';
import { StaffEnroll, StaffDetails } from 'src/assets/Models/staff-enroll';
import { FormsData } from 'src/assets/Models/FormsData';
import { MatRadioModule } from '@angular/material/radio'; // Import this
import { MatSelectModule } from '@angular/material/select'; // You'll also need this for mat-select
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Required for basic JS dates

export interface UserData {
  id: number;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})

export class StaffManagementComponent {

  role = 'Staff Management';
  description = 'Access and manage your staff information here.';


  displayedColumns: string[] = ['id', 'firstName', 'dob', 'class', 'actions'];
  dataSource = new MatTableDataSource<Entries>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('staffForm') staffForm!: NgForm;
  staffEnroll!: StaffEnroll;
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
  departments: any;
  designations: any;
  showDisabilityDetails = false;
  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.userForm = this.fb.group({ fName: [''], mName: [''], lname: [''], emailid: [''], phoneno: [''], name: [''], })
    this.dataService.postStaffData(this.userForm.value);
  }
  get f() {
    console.log(this.userForm);
    return this.userForm.controls;
  }
  ngOnInit() {
    this.loadStaffs();
  }

  loadStaffs() {
    this.dataService.getStaffs().subscribe((res: StaffEnroll) => {

      console.log("API Response:", res); // 👈 check this in console

      if (!res || !Array.isArray(res)) {
        console.error("Response is not an array");
        return;
      }

      const formatted = res.map((item: StaffEnroll) => ({
        id: item.id,
        firstName: item.staffDetails[0].fName + ' ' + item.staffDetails[0].lName || '',
        dob: item.staffDetails[0].dob || '',
        class: item.staffDetails[0].joiningClass || ''
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

    if (this.staffEnroll.id == null) {
      console.log("Inserting new entry");
      this.dataService.postStaffData(this.staffEnroll).subscribe({
        next: (res) => {
          console.log("Saved Successfully", res);

          this.loadStaffs();   // refresh table
          this.showForm = false; // close form
        },
        error: (err) => {
          console.error("Error:", err);
        }
      });
    }
    else {
      console.log("Updating entry");

      this.dataService.updateStaffData(this.staffEnroll.id, this.staffEnroll).subscribe({
        next: (res) => {
          console.log("Saved Successfully", res);
          this.loadStaffs();   // refresh table
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

    this.dataService.getStaffsbyID(id).subscribe(res => {

      console.log("Edit Data:", res);
      // Open form
      this.showForm = true;
      // Assign full object to form model
      this.staffEnroll = res;
    });
    this.GetStaffsInputData();
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
        this.loadStaffs(); // Refresh the student list
      }
    );
  }

  openAddForm() {
    this.showForm = true;

    // 1. Reset the validation state
    if (this.staffForm) {
      this.staffForm.resetForm();
    }

    // 2. Initialize the model to match structure
    this.staffEnroll = {
      id: null, // Important for save vs update logic
      staffDetails: [new StaffDetails()],
      emergencyDetails: [new EmergencyDetail()]
    };

    this.castes = [];
    this.designations = [];

    // 4. Call the API
    this.GetStaffsInputData();
  }

  // GetStaffsInputData() {
  //   this.dataService.getFormInputData().subscribe({
  //     next: (res: FormsData) => {
  //       console.log("Form Data Received:", res);

  //       this.religions = res?.formData?.religions || [];
  //       this.departments = res?.staffFormData?.departments || [];
  //       this.languages = res?.formData?.languages || [];
  //       this.classes = res?.formData?.classes || [];
  //       this.documents = res?.formData?.documents || [];
  //     },
  //     error: (err) => console.error("API Error:", err)
  //   });
  // }
  GetStaffsInputData() {
    this.dataService.getFormInputData().subscribe({
      next: (res: any) => { // Using any temporarily to bypass strict model checks if they mismatch
        console.log("Form Data Received:", res);

        this.religions = res?.FormData?.religions || [];
        this.departments = res?.StaffFormData?.departments || [];
        this.languages = res?.FormData?.languages || [];
        this.classes = res?.FormData?.classes || [];
        this.documents = res?.FormData?.documents || [];

        console.log("Religions bound:", this.religions); // Should show array now
      },
      error: (err) => console.error("API Error:", err)
    });
  }

  onReligionChange(value: string) {
    // We filter from the local 'this.religions' array already fetched
    const selected = this.religions.find((r: any) => r.value === value);
    this.castes = selected ? selected.castes : [];

    // Optional: Reset the category selection when religion changes
    this.staffEnroll.staffDetails[0].category = '';
  }
  onDepartmentChange(value: string) {
    // We filter from the local 'this.departmentss' array already fetched
    const selected = this.departments.find((r: any) => r.value === value);
    this.designations = selected ? selected.positions : [];

    // Optional: Reset the category selection when departments changes
    this.staffEnroll.staffDetails[0].position = '';
  }

  onDisabilityChange(value: string) {
    this.showDisabilityDetails = value === 'Yes';
  }
}

