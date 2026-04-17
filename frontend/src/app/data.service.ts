
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from 'src/assets/Models/entry';
import { StudEnroll } from 'src/assets/Models/stud-enroll';
import { StaffEnroll } from 'src/assets/Models/staff-enroll';
import { FormsData } from 'src/assets/Models/FormsData';
import { CardTileComponent } from './card-tile/card-tile.component';
@Injectable({
  providedIn: 'root'
})
export class DataService {


  private url = '/assets/stud-data.json';

  constructor(private http: HttpClient) {
  }

  //#region  General Common
  getFormInputData(): Observable<FormsData> {
    return this.http.get<FormsData>('http://localhost:3001/inputformData');
  }
  //#endregion
  //#region Student APIs
  postStudentData(data: any): Observable<StudEnroll> {
    return this.http.post<StudEnroll>('http://localhost:3000/students', data);
  }
  getStudents(): Observable<StudEnroll> {
    return this.http.get<StudEnroll>('http://localhost:3000/students');
  }

  getStudentsbyID(id: number): Observable<StudEnroll> {
    return this.http.get<StudEnroll>(`${'http://localhost:3000/students'}/${id}`);
  }
  updateStudentData(id: number, data: any): Observable<any> {
    return this.http.put(`${'http://localhost:3000/students'}/${id}`, data);
  }
  updateStudentClassandDivision(selectedIds: any[], updateData: any) {
    return this.http.put(`${'http://localhost:3000'}/students`, { ids: selectedIds, updateData });
  }
  deleteStudentData(id: number): Observable<any> {
    return this.http.delete(`${'http://localhost:3000/students'}/${id}`);
  }
  //#endregion

  //#region Staff APIs

  postStaffData(data: any): Observable<StaffEnroll> {
    return this.http.post<StaffEnroll>('http://localhost:3000/staff', data);
  }
  getStaffs(): Observable<StaffEnroll> {
    return this.http.get<StaffEnroll>('http://localhost:3000/staff');
  }

  getStaffsbyID(id: number): Observable<StaffEnroll> {
    return this.http.get<StaffEnroll>(`${'http://localhost:3000/staff'}/${id}`);
  }
  updateStaffData(id: number, data: any): Observable<any> {
    return this.http.put(`${'http://localhost:3000/staff'}/${id}`, data);
  }


  deleteStaffData(id: number): Observable<any> {
    return this.http.delete(`${'http://localhost:3000/staff'}/${id}`);
  }
  //#endregion

}