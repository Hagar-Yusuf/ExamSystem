import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Exam {
  id: number;
  title: string;
  description: string;
  Duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7003/api/Exam/ViewAllExams';

  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.apiUrl, {
      withCredentials: true // ✅ now this works with Fetch API
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
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
