import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../../../services/student-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-exam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-exam.html',
  styleUrls: ['./start-exam.css']
})
export class StartExamComponent implements OnInit {
  private studentService = inject(StudentService);
  private router = inject(Router);

  availableExams: any[] = [];
  currentExam: any = null;
  answers: { [questionId: number]: string } = {};
  allExams: any[] = [];

  ngOnInit(): void {
    this.loadAvailableExams();
  }

  loadAvailableExams(): void {
    this.studentService.GetAllExams().subscribe({
      next: (exams) => this.availableExams = exams,
      error: (err) => console.error('Failed to load exams:', err)
    });
  }

  startExam(examId: number): void {
    this.studentService.StartExam(examId).subscribe({
      next: () => this.loadExamWithQuestions(examId),
      error: (err) => console.error('Failed to start exam:', err)
    });
  }

  loadExamWithQuestions(examId: number): void {
    this.studentService.GetExamWithQuestions(examId).subscribe({
      next: (exam) => {
        this.currentExam = exam;
        this.answers = {};
      },
      error: (err) => console.error('Failed to load exam questions:', err)
    });
  }

  selectAnswer(questionId: number, answer: string): void {
    this.answers[questionId] = answer;
  }

  submitExam(): void {
    const submitExamDto = {
      exam_ID: this.currentExam.exam_ID,
      answers: Object.entries(this.answers).map(([questionId, selectedAnswer]) => ({
        question_ID: +questionId,
        selectedAnswer
      }))
    };

    this.studentService.SubmitExam(submitExamDto).subscribe({
      next: (res) => {
        alert(`Exam submitted! Your score is: ${res.score}`);
        this.currentExam = null;
        this.answers = {};
        this.router.navigate(['/student/results']);
      },
      error: (err) => console.error('Failed to submit exam:', err)
    });
  }
}
