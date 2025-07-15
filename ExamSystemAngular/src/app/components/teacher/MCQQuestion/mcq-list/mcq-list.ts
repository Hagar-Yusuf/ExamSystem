import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { McqQuestionService } from '../../../../services/mcq-question.service';
import { MCQQuestion } from '../../../../Models/mcq-question.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcq-list',
  templateUrl: './mcq-list.html',
  styleUrl: './mcq-list.css',
    standalone: true,
    imports: [RouterModule]

})
export class McqList implements OnInit {
  questions: MCQQuestion[] = [];

  constructor(private service: McqQuestionService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.questions = data);
  }

  delete(id: number) {
    if (confirm('Delete this question?')) {
      this.service.delete(id).subscribe(() => {
        this.questions = this.questions.filter(q => q.question_ID !== id);
      });
    }
  }
}
