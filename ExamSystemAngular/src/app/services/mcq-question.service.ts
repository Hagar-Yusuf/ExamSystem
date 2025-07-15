import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateMcqQuestionDto, MCQQuestion } from '../Models/mcq-question.model';

@Injectable({
  providedIn: 'root'
})
export class McqQuestionService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7003/api/McqQuestions';
  private viewByIdUrl = 'https://localhost:7003/api/ViewMcqQuestionByID';
  private deleteUrl = 'https://localhost:7003/api/DeleteMcqQuestion';

  getAll(): Observable<MCQQuestion[]> {
    return this.http.get<MCQQuestion[]>(`${this.baseUrl}/ViewAllMcqQuestions`).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<MCQQuestion> {
    return this.http.get<MCQQuestion>(`${this.viewByIdUrl}/${id}`).pipe(catchError(this.handleError));
  }

  add(mcq: CreateMcqQuestionDto): Observable<MCQQuestion> {
    return this.http.post<MCQQuestion>(`${this.baseUrl}/AddMcqQuestion`, mcq).pipe(catchError(this.handleError));
  }

  update(id: number, mcq: Partial<MCQQuestion>): Observable<MCQQuestion> {
    return this.http.put<MCQQuestion>(`${this.baseUrl}/EditMcqQuestion/${id}`, mcq).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.error || 'Unknown error';
    return throwError(() => new Error(message));
  }
}
