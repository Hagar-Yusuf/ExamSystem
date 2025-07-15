// src/app/components/teacher/exam-details/exam-details.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService, Exam } from '../../../services/exam-service';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.html',
  styleUrls: ['./exam-details.css'],
  standalone: true
})
export class ExamDetails implements OnInit {
  exam: Exam | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    const examId = Number(this.route.snapshot.paramMap.get('id'));
    if (examId) {
      this.examService.getExamById(examId).subscribe({
        next: (data) => this.exam = data,
        error: (err) => this.errorMessage = err.message
      });
    }
  }
}
