import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7003/api/student';

  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  GetAllExams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/exams`, this.getAuthHeaders());
  }

  StartExam(examId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/exams/${examId}/start`, {}, this.getAuthHeaders());
  }

  GetExamWithQuestions(examId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/exams/${examId}`, this.getAuthHeaders());
  }

  SubmitExam(submitExamDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/exams/submit`, submitExamDto, this.getAuthHeaders());
  }

  GetResults(): Observable<any> {
    return this.http.get(`${this.apiUrl}/results`, this.getAuthHeaders());
  }
}
