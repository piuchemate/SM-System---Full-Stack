// ...existing code...
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudEntry } from 'src/assets/Models/stud-entry';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = '/assets/stud-data.json';

  constructor(private http: HttpClient) {
  }
  postStudentData(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/students', data);
  }
  getStudents(): Observable<StudEntry> {
    return this.http.get<StudEntry>('http://localhost:3000/students');
  }

}