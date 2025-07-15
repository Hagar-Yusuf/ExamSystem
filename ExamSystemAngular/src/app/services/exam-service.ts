// src/app/services/exam-service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth-service';

export interface Exam {
  exam_ID: number;
  title: string;
  description: string;
  duration: number;
}

export type CreateExamDto = Omit<Exam, 'exam_ID'>;
export type ExamDto = Omit<Exam, 'exam_ID'>;

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = 'https://localhost:7003/api/Exam';

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : ''
      })
    };
  }

  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.baseUrl}/ViewAllExams`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getExamById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.baseUrl}/ViewExam/${id}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  editExam(id: number, updatedExam: Partial<Exam>): Observable<Exam> {
    return this.http.put<Exam>(`${this.baseUrl}/EditExam/${id}`, updatedExam, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteExam/${id}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  createExam(exam: CreateExamDto): Observable<Exam> {
    return this.http.post<Exam>(`${this.baseUrl}/AddExam`, exam, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else if (typeof error.error === 'string') {
      message = error.error;
    } else if (error.error?.message) {
      message = error.error.message;
    }

    console.error('API Error:', error);
    return throwError(() => new Error(message));
  }
}
