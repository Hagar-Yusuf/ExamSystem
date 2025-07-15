import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { McqQuestionService } from '../../../../services/mcq-question.service';
import { CreateMcqQuestionDto } from '../../../../Models/mcq-question.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcq-add',
  templateUrl: './mcq-add.html',
  standalone: true,
  styleUrls: ['./mcq-add.css'],
  imports: [FormsModule, CommonModule]
})
export class McqAdd {
  form: CreateMcqQuestionDto = {
    body: '',
    mark: 1,
    correctAnswer: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    exam_ID: 1
  };

  constructor(private service: McqQuestionService, private router: Router) {}

  submit() {
    this.service.add(this.form).subscribe(() => this.router.navigate(['/admin/mcq']));
  }
}
