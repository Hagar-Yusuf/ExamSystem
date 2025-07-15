import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrueFalseQuestion } from '../../../../Models/true-false-question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrueFalseQuestionService } from '../../../../services/true-false-question-service';

@Component({
  selector: 'app-tf-edit',
  templateUrl: './true-false-edit.html',
  styleUrls: ['./true-false-edit.css'],  // corrected here
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TfEdit implements OnInit {
  tf?: TrueFalseQuestion;

  constructor(
    private service: TrueFalseQuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe(q => this.tf = q);
  }

  update() {
    if (!this.tf) return;
    this.service.update(this.tf.trueFalse_ID, this.tf).subscribe(() => this.router.navigate(['/tf']));
  }
}
