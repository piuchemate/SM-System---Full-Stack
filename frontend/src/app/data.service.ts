
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from 'src/assets/Models/entry';
import { StudEnroll } from 'src/assets/Models/stud-enroll';
import { TeachEnroll } from 'src/assets/Models/teach-enroll';
import { StudFormData } from 'src/assets/Models/StudFormData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = '/assets/stud-data.json';

  constructor(private http: HttpClient) {
  }

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

  getStudentsFormData(): Observable<StudFormData> {
    return this.http.get<StudFormData>('http://localhost:3001/formData');
  }
  deleteStudentData(id: number): Observable<any> {
    return this.http.delete(`${'http://localhost:3000/students'}/${id}`);
  }
  //#endregion

  //#region Teacher APIs

  postTeacherData(data: any): Observable<TeachEnroll> {
    return this.http.post<TeachEnroll>('http://localhost:3000/teachers', data);
  }
  getTeachers(): Observable<TeachEnroll> {
    return this.http.get<TeachEnroll>('http://localhost:3000/teachers');
  }

  getTeachersbyID(id: number): Observable<TeachEnroll> {
    return this.http.get<TeachEnroll>(`${'http://localhost:3000/teachers'}/${id}`);
  }
  updateTeacherData(id: number, data: any): Observable<any> {
    return this.http.put(`${'http://localhost:3000/teachers'}/${id}`, data);
  }

  getTeachersFormData(): Observable<StudFormData> {
    return this.http.get<StudFormData>('http://localhost:3001/formData');
  }
  deleteTeacherData(id: number): Observable<any> {
    return this.http.delete(`${'http://localhost:3000/teachers'}/${id}`);
  }
  //#endregion
}