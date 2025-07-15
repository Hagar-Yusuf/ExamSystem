import { Routes } from '@angular/router';

// Exam Components
import { AllExamsComponent } from './components/teacher/exams/exams';
import { ExamDetails } from './components/teacher/exam-details/exam-details';
import { EditExam } from './components/teacher/edit-exam/edit-exam';
import { AddExam } from './components/teacher/add-exam/add-exam';
import { McqList } from './components/teacher/MCQQuestion/mcq-list/mcq-list';
import { McqDetails } from './components/teacher/MCQQuestion/mcq-details/mcq-details';
import { McqAdd } from './components/teacher/MCQQuestion/mcq-add/mcq-add';
import { McqEdit } from './components/teacher/MCQQuestion/mcq-edit/mcq-edit';

// MCQ Components

export const routes: Routes = [
  // Exam Routes
  { path: '', redirectTo: 'exam', pathMatch: 'full' },
  { path: 'exam', component: AllExamsComponent },
  { path: 'exam/details/:id', component: ExamDetails },
  { path: 'exam/edit/:id', component: EditExam },
  { path: 'exam/add', component: AddExam },

  // MCQ Routes
  { path: 'mcq', component: McqList },
  { path: 'mcq/view/:id', component: McqDetails },
  { path: 'mcq/add', component: McqAdd },
  { path: 'mcq/edit/:id', component: McqEdit },

  // Optional wildcard route
  // { path: '**', component: NotFoundComponent } // if you have a 404 page
];
