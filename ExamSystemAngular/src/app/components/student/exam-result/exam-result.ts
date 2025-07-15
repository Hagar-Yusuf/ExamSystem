import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student-service'; // Adjust path if needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./exam-result.css']
})
export class ExamResultComponent implements OnInit {

  results: any[] = [];
  studentId: number = 6;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.GetResults(this.studentId).subscribe({
      next: (data) => this.results = data,
      error: (err) => console.error('Failed to load results:', err)
    });
  }
}
