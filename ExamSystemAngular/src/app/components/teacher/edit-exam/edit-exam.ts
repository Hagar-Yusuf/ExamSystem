// src/app/components/teacher/edit-exam/edit-exam.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exam, ExamService } from '../../../services/exam-service';

@Component({
  selector: 'app-edit-exam',
  standalone: true,
  templateUrl: './edit-exam.html',
  styleUrls: ['./edit-exam.css'],
  imports: [CommonModule, FormsModule]
})
export class EditExam implements OnInit {
  exam: Exam = {
    exam_ID: 0,
    title: '',
    description: '',
    duration: 0
  };

  errorMessage = '';
  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.examService.getExamById(this.id).subscribe({
      next: (data) => this.exam = data,
      error: (err) => this.errorMessage = 'Failed to load exam: ' + err.message
    });
  }

  onSubmit() {
const updatedExam = {
  exam_ID: this.exam.exam_ID,
  title: this.exam.title,
  description: this.exam.description,
  duration: this.exam.duration
};


    this.examService.editExam(this.exam.exam_ID, updatedExam).subscribe({
      next: () => this.router.navigate(['/admin/exam']),
      error: (err) => {
        console.error('Edit error:', err);
        this.errorMessage = 'Edit failed: ' + (err.message || 'An unknown error occurred');
      }
    });
  }
}
