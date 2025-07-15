import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CreateTrueFalseQuestionDto } from '../../../../Models/true-false-question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrueFalseQuestionService } from '../../../../services/true-false-question-service';

@Component({
  selector: 'app-tf-add',
  templateUrl: './true-false-add.html',
  styleUrls: ['./true-false-add.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TfAdd {
  tf: CreateTrueFalseQuestionDto = {
    body: '',
    correctAnswer: false,
    mark: 1,
    option1: '',
    option2: '',
    exam_ID: 0
  };

  constructor(private service: TrueFalseQuestionService, private router: Router) {}

  save() {
    this.service.add(this.tf).subscribe(() => this.router.navigate(['/tf']));
  }
}
