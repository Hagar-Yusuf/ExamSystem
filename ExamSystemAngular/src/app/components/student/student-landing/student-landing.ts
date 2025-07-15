import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'student-landing.html',
  styleUrls: ['student-landing.css']
})
export class StudentLanding implements OnInit {
  private studentService = inject(StudentService);
  private router = inject(Router);

  exams: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.studentService.GetAllExams().subscribe({
      next: exams => {
        this.exams = exams;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load exams';
        this.loading = false;
      }
    });
  }

startExam(examId: number) {
  this.router.navigate(['/student/exams/start', examId]);
}


  goToResults() {
    this.router.navigate(['/student/results']);
  }
}
