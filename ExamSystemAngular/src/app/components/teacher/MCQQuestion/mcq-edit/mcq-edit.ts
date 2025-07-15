import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MCQQuestion } from '../../../../Models/mcq-question.model';
import { McqQuestionService } from '../../../../services/mcq-question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcq-edit',
  templateUrl: './mcq-edit.html',
  styleUrls: ['./mcq-edit.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class McqEdit implements OnInit {
  mcq!: MCQQuestion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mcqService: McqQuestionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mcqService.getById(+id).subscribe({
        next: (data) => (this.mcq = data),
        error: (err) => console.error('Failed to load MCQ', err),
      });
    }
  }

  update(): void {
    if (!this.mcq || !this.mcq.question_ID) return;

    this.mcqService.update(this.mcq.question_ID, this.mcq).subscribe({
      next: () => this.router.navigate(['/admin/mcq']),
      error: (err) => console.error('Update failed', err),
    });
  }
}
