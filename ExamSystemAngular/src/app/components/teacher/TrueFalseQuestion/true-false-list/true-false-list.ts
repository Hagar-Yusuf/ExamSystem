import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TrueFalseQuestion } from '../../../../Models/true-false-question.model';
import { CommonModule } from '@angular/common';
import { TrueFalseQuestionService } from '../../../../services/true-false-question-service';

@Component({
  selector: 'app-tf-list',
  templateUrl: './true-false-list.html',
  styleUrls: ['./true-false-list.css'],  // corrected here
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class TfList implements OnInit {
  questions: TrueFalseQuestion[] = [];

  constructor(private service: TrueFalseQuestionService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.questions = data);
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe(() => {
        this.questions = this.questions.filter(q => q.trueFalse_ID !== id);
      });
    }
  }
}
