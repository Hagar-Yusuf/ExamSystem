import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface QuestionAddDto {
  Type: 'MCQ' | 'TrueFalse';
  Body: string;
  Mark: number;
  Exam_ID: number | null;
  Option1?: string;
  Option2?: string;
  Option3?: string;
  Option4?: string;
  CorrectAnswer?: string;       // for MCQ
  CorrectAnswerBool?: boolean;  // for TrueFalse
}

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-question.html',
})
export class AddQuestionComponent {
  question: QuestionAddDto = {
    Type: 'MCQ',
    Body: '',
    Mark: 0,
    Exam_ID: null,
    Option1: '',
    Option2: '',
    Option3: '',
    Option4: '',
    CorrectAnswer: '',
    CorrectAnswerBool: undefined
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const payload: any = {
      Body: this.question.Body,
      Mark: this.question.Mark,
      Exam_ID: this.question.Exam_ID,
    };

    let endpoint = '';

    if (this.question.Type === 'MCQ') {
      // Build MCQ payload
      payload.Option1 = this.question.Option1;
      payload.Option2 = this.question.Option2;
      payload.Option3 = this.question.Option3;
      payload.Option4 = this.question.Option4;

      const options = [
        this.question.Option1,
        this.question.Option2,
        this.question.Option3,
        this.question.Option4
      ];
      const correctIndex = options.indexOf(this.question.CorrectAnswer) + 1;
      payload.CorrectAnswer = correctIndex;

      endpoint = 'https://localhost:7003/api/McqQuestions/Add-Mcq-Question';
    } else {
      // Build TrueFalse payload
      payload.Option1 = this.question.Option1;
      payload.Option2 = this.question.Option2;
      payload.CorrectAnswer = this.question.CorrectAnswerBool ? 1 : 2;

      endpoint = 'https://localhost:7003/api/TrueFalseQuestions/Add-TrueFalse-Question';
    }

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post(endpoint, payload, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Question added successfully!';
        this.errorMessage = '';
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage = 'Failed to add question. ' + (err.error?.message || err.statusText || '');
        this.successMessage = '';
        console.error(err);
      }
    });
  }

  resetForm() {
    this.question = {
      Type: 'MCQ',
      Body: '',
      Mark: 0,
      Exam_ID: null,
      Option1: '',
      Option2: '',
      Option3: '',
      Option4: '',
      CorrectAnswer: '',
      CorrectAnswerBool: undefined
    };
  }
}
