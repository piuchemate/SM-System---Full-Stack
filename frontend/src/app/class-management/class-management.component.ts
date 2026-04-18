import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Entries } from 'src/assets/Models/entry';
import { StaffEnroll } from 'src/assets/Models/staff-enroll';
import { UserData } from '../staff-management/staff-management.component';
import { StudEnroll } from 'src/assets/Models/stud-enroll';
import { SelectionModel } from '@angular/cdk/collections';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-class&subject-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent {
  private _liveAnnouncer = inject(LiveAnnouncer);

  userForm: import("@angular/forms").FormGroup<{ fName: import("@angular/forms").FormControl<string | null>; mName: import("@angular/forms").FormControl<string | null>; lname: import("@angular/forms").FormControl<string | null>; emailid: import("@angular/forms").FormControl<string | null>; phoneno: import("@angular/forms").FormControl<string | null>; name: import("@angular/forms").FormControl<string | null>; }>;
  isEditFormVisible: boolean = false;
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
  displayedColumnsMainTable: string[] = ['select', 'id', 'name', 'class', 'division', 'actions'];
  dataSourceMainTable = new MatTableDataSource<Entries>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('staffForm') staffForm!: NgForm;
  staffEnroll!: StaffEnroll;
  studId!: number;
  classList: any[] = [];
  divisionList: any[] = [];

  // For the actual selections
  selectedClass: string = '';
  selectedDivision: string = '';
  searchFilter: string = '';

  displayedColumnsEditTable: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSourceEditTable = new MatTableDataSource<Entries>();

  originalStudentData!: StudEnroll; // To store original data for reset if needed

  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.userForm = this.fb.group({ fName: [''], mName: [''], lname: [''], emailid: [''], phoneno: [''], name: [''], })
    this.dataService.postStaffData(this.userForm.value);
  }


  ngOnInit() {
    this.loadStudents();


  }


  ngAfterViewInit() {
   this.dataSourceMainTable.paginator = this.paginator;
    this.dataSourceEditTable.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadStudents() {
    this.dataService.getStudents().subscribe((res: any) => {

      this.originalStudentData = res;

      const formatted = res.map((item: any) => ({ id: item.id, name: item.studentDetails[0]?.fName + ' ' + item.studentDetails[0]?.mName + ' ' + item.studentDetails[0]?.lName, class: item.studentDetails[0]?.admissionClass, division: item.studentDetails[0]?.division }));
      this.dataSourceMainTable.data = formatted.map((s: any) => new Entries(s));

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
      this.dataSourceMainTable.filterPredicate = (data: any, filter: string) => {
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
    this.dataSourceMainTable.filter = JSON.stringify(combinedFilter);

    if (this.dataSourceMainTable.paginator) {
      this.dataSourceMainTable.paginator.firstPage();
    }
  }

  applyDropdownFilter(event: Event) {
    const filterValue = {
      class: this.selectedClass,
      division: this.selectedDivision,
      search: this.searchFilter
    };

    this.dataSourceMainTable.filter = JSON.stringify(filterValue);

    console.log("Applied Filter:", filterValue, "DataSource Filter:", this.dataSourceMainTable.filter);

    if (this.dataSourceMainTable.paginator) {
      this.dataSourceMainTable.paginator.firstPage();
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceMainTable.filteredData.length; // Fixed: access .data
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
 
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }else {
    this.dataSourceMainTable.filteredData.forEach(row =>
      this.selection.select(row)
    );
  }

    // Select every row in the current data source
    this.selection.select(...this.dataSourceMainTable.data);
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
      this.isEditFormVisible = true;
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

  updatedata() {
    const selectedIds = this.selection.selected.map((item: any) => item.id);

    console.log("Selected IDs for Update:", selectedIds);

    const formatted = (this.originalStudentData as any).filter((item: StudEnroll) =>
      selectedIds.includes(item.id)).map((item: any) =>
        ({ id: item.id, name: item.studentDetails[0]?.fName + ' ' + item.studentDetails[0]?.mName + ' ' + item.studentDetails[0]?.lName, class: item.studentDetails[0]?.admissionClass, division: item.studentDetails[0]?.division }));

    this.dataSourceEditTable.data = formatted.map((s: any) => new Entries(s));
    this.isEditFormVisible = true;
  }

  updateClassandDivision() {
    console.log("Updated Class:", this.selectedClass, "Updated Division:", this.selectedDivision);

    const selectedIds = this.selection.selected.map((item: any) => item.id);
    if (this.selectedClass || this.selectedDivision) {
      const updatedStudents = (this.originalStudentData as any).filter((item: StudEnroll) =>
        selectedIds.includes(item.id)).map((item: any) => {
          if (this.selectedClass) {
            item.studentDetails[0].admissionClass = this.selectedClass;
          }
          if (this.selectedDivision) {
            item.studentDetails[0].division = this.selectedDivision;
          }
          return item;
        });

      // Pass updatedStudents to the API (you may need to adjust the endpoint and payload structure)

      console.log("Updated Student Data to be sent to API:", updatedStudents);
      console.log("Selected IDs for Update:", selectedIds + " Update Data: " + JSON.stringify(updatedStudents));

      selectedIds.forEach((id: number) => {
        const studentData = updatedStudents.find((student: any) => student.id === id);
        this.dataService.updateStudentData(id, studentData).subscribe({
          next: (res) => {
            console.log("Saved Successfully", res);

            this.loadStudents();   // refresh table
            this.isEditFormVisible = false; // close form
          },
          error: (err) => {
            console.error("Error:", err);
          }
        });

      });
    }
  }
}