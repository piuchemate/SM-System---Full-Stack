// ...existing code...
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudEntry } from 'src/assets/Models/stud-entry';
import { StudEnroll } from 'src/assets/Models/stud-enroll';
import { StudFormData } from 'src/assets/Models/StudFormData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = '/assets/stud-data.json';

  constructor(private http: HttpClient) {
  }
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
    return this.http.get<StudFormData>('http://localhost:3001/studentFormData');
  }
  deleteStudentData(id: number): Observable<any> {
    return this.http.delete(`${'http://localhost:3000/students'}/${id}`);
  }
}