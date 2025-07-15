import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Exam {
  exam_ID: number;
  title: string;
  description: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7003/api/Exam';
  private getByIdUrl = 'https://localhost:7003/api/ViewExamByID';

  // Get all exams
  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.baseUrl}/ViewAllExams`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get exam by ID
  getExamById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.getByIdUrl}/${id}`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Edit exam
  editExam(id: number, updatedExam: Exam): Observable<Exam> {
    return this.http.put<Exam>(`${this.baseUrl}/EditExam/${id}`, updatedExam, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete exam
  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteExam/${id}`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  createExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(`${this.baseUrl}/AddExam`, exam, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error(

      error.error?.message || error.message || 'An unknown error occurred'
    ));
  }
}
