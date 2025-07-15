// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ExamService } from '../../../services/exam-service';

// @Component({
//   selector: 'app-create-exam',
//   standalone: true,
//   templateUrl: './add-exam.html',
//   styleUrls: ['./add-exam.css'],
//   imports: [CommonModule, FormsModule]
// })
// export class AddExam {
//   exam: Omit<any, 'exam_ID'> = {
//     title: '',
//     description: '',
//     duration: 0
//   };

//   errorMessage = '';

//   constructor(private examService: ExamService, private router: Router) {}

//   onSubmit() {
//     console.log('Creating exam:', this.exam);  // Helpful for debugging
//     this.examService.createExam(this.exam).subscribe({
//       next: () => this.router.navigate(['/exam']),
//       error: (err) => this.errorMessage = 'Create failed: ' + err.message
//     });
//   }
// }
