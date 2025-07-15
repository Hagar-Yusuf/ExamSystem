// src/app/services/student-service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7003/api/student';

  // ✅ Helper method to include JWT token in headers
  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ✅ Get all available exams for student
  GetAllExams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/exams`, this.getAuthHeaders());
  }

  // ✅ Start exam for student
  StartExam(examId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/exams/${examId}/start`, {}, this.getAuthHeaders());
  }

  // ✅ Get exam questions for the student
  GetExamWithQuestions(examId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/exams/${examId}`, this.getAuthHeaders());
  }

  // ✅ Submit exam answers
  SubmitExam(submitExamDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/exams/submit`, submitExamDto, this.getAuthHeaders());
  }

  // ✅ Get student's exam results
  GetResults(): Observable<any> {
    return this.http.get(`${this.apiUrl}/results`, this.getAuthHeaders());
  }
}
