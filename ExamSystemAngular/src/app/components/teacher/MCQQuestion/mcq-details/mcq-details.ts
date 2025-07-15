import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MCQQuestion } from '../../../../Models/mcq-question.model';
import { McqQuestionService } from '../../../../services/mcq-question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcq-details',
  templateUrl: './mcq-details.html',
  standalone: true,
  styleUrls: ['./mcq-details.css'],
  imports: []
})
export class McqDetails implements OnInit {
  mcq?: MCQQuestion;

  constructor(private route: ActivatedRoute, private service: McqQuestionService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe(data => this.mcq = data);
  }
}
