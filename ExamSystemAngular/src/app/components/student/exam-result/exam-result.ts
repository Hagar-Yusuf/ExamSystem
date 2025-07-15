import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../../../services/student-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-result.html',
  styleUrls: ['./exam-result.css']
})
export class ExamResultComponent implements OnInit {
  private studentService = inject(StudentService);
  results: any[] = [];

  ngOnInit(): void {
    this.studentService.GetResults().subscribe({
      next: (data) => this.results = data,
      error: (err) => console.error('Failed to load results:', err)
    });
  }
}
