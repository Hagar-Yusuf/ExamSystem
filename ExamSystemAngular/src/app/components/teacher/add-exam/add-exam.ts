// src/app/components/teacher/add-exam/add-exam.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../../services/exam-service';
import { CreateExamDto } from '../../../Models/exam.model';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  templateUrl: './add-exam.html',
  styleUrls: ['./add-exam.css'],
  imports: [CommonModule, FormsModule]
})
export class AddExam {
  exam: CreateExamDto = {
    title: '',
    description: '',
    duration: 0
  };

  errorMessage = '';

  constructor(private examService: ExamService, private router: Router) {}

  onSubmit() {
    this.examService.createExam(this.exam).subscribe({
      next: () => this.router.navigate(['/admin/exam']),
      error: (err) => this.errorMessage = 'Create failed: ' + err.message
    });
  }
}
