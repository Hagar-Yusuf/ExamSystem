import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-start-exam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-exam.html',
  styleUrls: ['./start-exam.css']
})
export class StartExamComponent implements OnInit {
  availableExams: any[] = [];
  currentExam: any = null;
  allExams: any[] = [];
  answers: { [questionId: number]: string } = {};
  studentId: number = 6;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {

    this.loadAllExams();

  }

  loadAllExams(): void {
    this.studentService.GetAllExams().subscribe({
      next: (exams) => this.allExams = exams,
      error: (err) => console.error('Failed to load all exams:', err)
    });
  }


  startExam(examId: number): void {
    this.studentService.StartExam(examId, this.studentId).subscribe({
      next: () => {
        this.loadExamWithQuestions(examId);
      },
      error: (err) => console.error('Failed to start exam:', err)
    });
  }


  loadExamWithQuestions(examId: number): void {
    this.studentService.GetExamWithQuestions(examId, this.studentId).subscribe({
      next: (exam) => {
        this.currentExam = exam;
        this.answers = {};
        console.log('Exam loaded:', exam);
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
      student_ID: this.studentId,
      answers: Object.entries(this.answers).map(([questionId, answer]) => ({
        question_ID: +questionId,
        selectedAnswer: answer
      }))
    };


    this.studentService.SubmitExam(submitExamDto).subscribe({
      next: (score) => {
        alert(`Exam submitted! Your score is: ${score}`);
        this.currentExam = null;
        this.answers = {};

        // Redirect to results page
        this.router.navigate(['/student/results']);
      },
      error: (err) => console.error('Failed to submit exam:', err)
    });
  }
}
