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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    const examId = Number(this.route.snapshot.paramMap.get('id'));
    if (examId) {
      this.examService.getExamById(examId).subscribe({
        next: (data) => {
          console.log('Loaded exam:', data); // ✅ Confirm it's loaded
          this.exam = data;
        },
        error: (err) => this.errorMessage = err.message
      });
    }
  }

 onSubmit(): void {
  const routeId = Number(this.route.snapshot.paramMap.get('id'));
  this.exam.exam_ID = routeId; 

  this.examService.editExam(this.exam.exam_ID, this.exam).subscribe({
    next: () => this.router.navigate(['/exam']),
    error: (err) => this.errorMessage = 'Update failed: ' + err.message
  });
}


}
