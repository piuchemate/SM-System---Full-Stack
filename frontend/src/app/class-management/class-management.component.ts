import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Entries } from 'src/assets/Models/entry';
import { StaffEnroll } from 'src/assets/Models/staff-enroll';
import { UserData } from '../staff-management/staff-management.component';
import { StudEnroll } from 'src/assets/Models/stud-enroll';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-class&subject-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent {
  userForm: import("@angular/forms").FormGroup<{ fName: import("@angular/forms").FormControl<string | null>; mName: import("@angular/forms").FormControl<string | null>; lname: import("@angular/forms").FormControl<string | null>; emailid: import("@angular/forms").FormControl<string | null>; phoneno: import("@angular/forms").FormControl<string | null>; name: import("@angular/forms").FormControl<string | null>; }>;
  showForm: boolean = false;
  religions: any;
  departments: any;
  languages: any;
  classes: any;
  documents: any;
  // track which row's action popover is open (id)
  activeRow: string | null = null;
  // dynamic data (can be changed anytime)
  role = 'Class and Subject Management';
  description = 'Access and manage your class and subject information here.';
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'id', 'name', 'class', 'division', 'actions'];
  dataSource = new MatTableDataSource<Entries>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('staffForm') staffForm!: NgForm;
  staffEnroll!: StaffEnroll;
  studId!: number;
  classList: any[] = [];
  divisionList: any[] = [];

  // For the actual selections
  selectedClass: string = '';
  selectedDivision: string = '';
  searchFilter: string = '';


  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.userForm = this.fb.group({ fName: [''], mName: [''], lname: [''], emailid: [''], phoneno: [''], name: [''], })
    this.dataService.postStaffData(this.userForm.value);
  }


  ngOnInit() {
    this.loadStudents();


  }
  loadStudents() {
    this.dataService.getStudents().subscribe((res: any) => {
      // ... your formatting logic ...
      const formatted = res.map((item: any) => ({ id: item.id, name: item.studentDetails[0]?.fName + ' ' + item.studentDetails[0]?.mName + ' ' + item.studentDetails[0]?.lName, class: item.studentDetails[0]?.admissionClass, division: item.studentDetails[0]?.division }));
      this.dataSource.data = formatted.map((s: any) => new Entries(s));

      // 1. Generate Unique Dropdown Lists
      this.classList = [...new Set(res
        .filter((item: StudEnroll) => item.studentDetails[0]?.admissionClass)
        .map((item: StudEnroll) => item.studentDetails[0].admissionClass)
      )];
      this.divisionList = [...new Set(res
        .filter((item: StudEnroll) => item.studentDetails[0]?.division)
        .map((item: StudEnroll) => item.studentDetails[0].division)
      )];

      // 2. Setup Custom Filter Predicate
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const searchTerms = JSON.parse(filter);

        // Use the || '' trick to ensure we are always calling toLowerCase on a string
        const studentClass = (data.class || '').toString().toLowerCase();
        const studentDivision = (data.division || '').toString().toLowerCase();
        const studentName = (data.name || '').toString().toLowerCase();
        const studentId = (data.id || '').toString().toLowerCase();

        const filterClass = (searchTerms.class || '').toLowerCase();
        const filterDivision = (searchTerms.division || '').toLowerCase();
        const filterSearch = (searchTerms.search || '').toLowerCase();

        const matchClass = studentClass.includes(filterClass);
        const matchDivision = studentDivision.includes(filterDivision);

        // Global search across name or ID
        const matchSearch = studentName.includes(filterSearch) ||
          studentId.includes(filterSearch);

        return matchClass && matchDivision && matchSearch;
      };
    });
  }
  get f() {
    console.log(this.userForm);
    return this.userForm.controls;
  }
  
  applyFilter(event: Event) {
  // 1. Get the text from the input
  const filterValue = (event.target as HTMLInputElement).value;
  this.searchFilter = filterValue; // Update the shared variable

  // 2. Create the combined filter object
  const combinedFilter = {
    class: this.selectedClass,
    division: this.selectedDivision,
    search: this.searchFilter
  };

  // 3. Send as JSON string
  this.dataSource.filter = JSON.stringify(combinedFilter);

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  applyDropdownFilter(event: Event) {
    const filterValue = {
      class: this.selectedClass,
      division: this.selectedDivision,
      search: this.searchFilter
    };
    
    this.dataSource.filter = JSON.stringify(filterValue);

    console.log("Applied Filter:", filterValue, "DataSource Filter:", this.dataSource.filter);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length; // Fixed: access .data
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    // Select every row in the current data source
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // You can use row.id or row.name for a more descriptive label
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
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
  onEdit(row: UserData) {

    const id = row.id;

    this.dataService.getStaffsbyID(id).subscribe(res => {

      console.log("Edit Data:", res);
      // Open form
      this.showForm = true;
      // Assign full object to form model
      this.staffEnroll = res;
    });
    this.activeRow = null;
  }


  GetStudentsInputData() {
    this.dataService.getFormInputData().subscribe({
      next: (res: any) => {
        console.log("Form Data Received:", res);

        this.classes = res?.FormData?.classes || [];
      },
      error: (err) => console.error("API Error:", err)
    });
  }

  // toggle action popover for a row
  toggleActions(id: string, event?: Event) {
    if (event) { event.stopPropagation(); } // prevent document click closures if used
    this.activeRow = this.activeRow === id ? null : id;
  }
updatedata(){
    this.showForm = true;

}
}
