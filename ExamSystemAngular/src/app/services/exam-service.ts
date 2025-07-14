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

  private allExamsUrl = 'https://localhost:7003/api/Exam/ViewAllExams';
  private examByIdUrl = 'https://localhost:7003/api/ViewExamByID'; // Notice: No /Exam prefix

  // ✅ Get all exams
  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.allExamsUrl, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Get exam by ID
  getExamById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.examByIdUrl}/${id}`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Delete exam by ID (optional, since you had it in earlier code)
  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.allExamsUrl}/${id}`, {
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
