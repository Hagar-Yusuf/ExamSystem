import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7003/api/student';


  GetAllExams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allexams`);
  }

  StartExam(examId: number, studentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/exams/${examId}/start?studentId=${studentId}`, {});
  }


  GetExamWithQuestions(examId: number, studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/exams/${examId}?studentId=${studentId}`);
  }

  SubmitExam(submitExamDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/exams/submit`, submitExamDto);
  }

  GetResults(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/results?studentId=${studentId}`);
  }
}
