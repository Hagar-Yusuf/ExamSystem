import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MCQQuestion } from '../../../../Models/mcq-question.model';
import { McqQuestionService } from '../../../../services/mcq-question.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcq-edit',
  templateUrl: './mcq-edit.html',
  standalone: true,
  imports: [FormsModule]
})
export class McqEdit implements OnInit {
  mcq?: MCQQuestion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: McqQuestionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe(data => this.mcq = data);
  }

  update() {
    if (this.mcq)
      this.service.update(this.mcq.question_ID, this.mcq).subscribe(() => {
        this.router.navigate(['/mcq']);
      });
  }
}
