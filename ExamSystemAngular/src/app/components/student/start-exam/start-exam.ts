import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../../../services/student-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start-exam',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './start-exam.html',
  styleUrls: ['./start-exam.css']
})
export class StartExamComponent implements OnInit {
  private studentService = inject(StudentService);
  private router = inject(Router);

  availableExams: any[] = [];
  currentExam: any = null;

  answers: {
    questionId: number;
    mcqId: number | null;
    trueFalseId: number | null;
    selectedOption: number;
  }[] = [];

  ngOnInit(): void {
    this.loadAvailableExams();
  }
get allQuestionsAnswered(): boolean {
  return this.answers.length === (this.currentExam?.questions.length ?? 0);
}

loadAvailableExams(): void {
  this.studentService.GetAllExams().subscribe({
    next: exams => {
      this.availableExams = exams.filter((exam: any) => !exam.isSubmitted);
    },
    error: err => console.error('Failed to load exams:', err)
  });
}


  startExam(examId: number): void {
    this.studentService.StartExam(examId).subscribe({
      next: exam => {
        this.currentExam = exam;
        this.answers = [];
        console.log('Started Exam:', this.currentExam);
      },
      error: err => console.error('Failed to start exam:', err)
    });
  }

  selectAnswer(question: any, answer: string): void {
    const existingIndex = this.answers.findIndex(a => a.questionId === question.questionId);

    let selectedOptionNum: number;

    if (question.type === 'MCQ') {
      selectedOptionNum = Number(answer);  // converts string index to number
    } else if (question.type === 'TrueFalse') {
      selectedOptionNum = answer === 'True' ? 1 : 2;
    } else {
      selectedOptionNum = 0;
    }

    const answerEntry = {
      questionId: question.questionId,
      mcqId: question.type === 'MCQ' ? question.questionId : 0,
      trueFalseId: question.type === 'TrueFalse' ? question.questionId : 0,
      selectedOption: selectedOptionNum  // number here, not string
    };

    if (existingIndex !== -1) {
      this.answers[existingIndex] = answerEntry;
    } else {
      this.answers.push(answerEntry);
    }

    console.log('Answer selected:', answerEntry);
  }

submitExam(): void {
  if (!this.currentExam) {
    alert('No exam is currently started.');
    return;
  }

  if (!this.allQuestionsAnswered) {
    alert('Please answer all questions before submitting.');
    return;
  }

  if (!confirm('Are you sure you want to submit the exam?')) {
    return;
  }

  // Prepare answers for backend, omitting zeros
  const submitAnswers = this.answers.map(a => ({
    mcqId: a.mcqId && a.mcqId !== 0 ? a.mcqId : undefined,
    trueFalseId: a.trueFalseId && a.trueFalseId !== 0 ? a.trueFalseId : undefined,
    selectedOption: a.selectedOption
  }));

  const submitExamDto = {
    examId: this.currentExam.exam_ID,
    answers: submitAnswers
  };

  console.log('Submitting exam with payload:', submitExamDto);

  this.studentService.SubmitExam(submitExamDto).subscribe({
    next: res => {
      alert(`Exam submitted! Your score is: ${res.score}`);
      this.currentExam = null;
      this.answers = [];
      this.loadAvailableExams();
      this.router.navigate(['/student/results']).then(() => {
        console.log('Navigated to results');
      });
    },
    error: err => {
      console.error('Failed to submit exam:', err);
      alert('Submission failed. Please try again.');
    }
  });
}

}
