import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TrueFalseQuestion, CreateTrueFalseQuestionDto } from '../Models/true-false-question.model';

@Injectable({ providedIn: 'root' })
export class TrueFalseQuestionService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7003/api/TrueFalseQuestions';

  getAll(): Observable<TrueFalseQuestion[]> {
    return this.http.get<TrueFalseQuestion[]>(`${this.baseUrl}/ViewAll-TrueFalse-Questions`)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<TrueFalseQuestion> {
    return this.http.get<TrueFalseQuestion>(`${this.baseUrl}/View-TrueFalse-Questions/${id}`)
      .pipe(catchError(this.handleError));
  }

  add(tf: CreateTrueFalseQuestionDto): Observable<TrueFalseQuestion> {
    return this.http.post<TrueFalseQuestion>(`${this.baseUrl}/Add-TrueFalse-Question`, tf)
      .pipe(catchError(this.handleError));
  }

  update(id: number, tf: Partial<TrueFalseQuestion>): Observable<TrueFalseQuestion> {
    return this.http.put<TrueFalseQuestion>(`${this.baseUrl}/Edit-TrueFalse-Question/${id}`, tf)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Delete-TrueFalse-Question/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const msg = error.error?.message || error.error || 'Unknown error';
    return throwError(() => new Error(msg));
  }
}
