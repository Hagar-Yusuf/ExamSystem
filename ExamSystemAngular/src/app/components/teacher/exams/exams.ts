import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService, Exam } from '../../../services/exam-service';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exams.html',
  styleUrl: './exams.css'
})
export class AllExamsComponent implements OnInit {
  private examService = inject(ExamService);
  private router = inject(Router);

  exams = signal<Exam[]>([]);
  loading = signal(false);
  error = signal('');
  showDeleteModal = signal(false);
  examToDelete = signal<Exam | null>(null);

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.loading.set(true);
    this.error.set('');
    this.examService.getAllExams().subscribe({
      next: (data) => {
        this.exams.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  deleteExam(id: number) {
    const exam = this.exams().find(e => e.id === id);
    if (exam) {
      this.examToDelete.set(exam);
      this.showDeleteModal.set(true);
    }
  }

  confirmDelete() {
    const exam = this.examToDelete();
    if (exam) {
      this.examService.deleteExam(exam.id).subscribe({
        next: () => {
          this.exams.update(exams => exams.filter(e => e.id !== exam.id));
          this.showDeleteModal.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
        }
      });
    }
  }

  viewDetails(examId: number) {
    this.router.navigate(['/exam/details', examId]);
  }

  cancelDelete() {
    this.showDeleteModal.set(false);
    this.examToDelete.set(null);
  }
}
