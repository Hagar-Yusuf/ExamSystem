import { Routes } from '@angular/router';
import { AllExamsComponent } from './components/teacher/exams/exams';
import { ExamDetails } from './components/teacher/exam-details/exam-details';

export const routes: Routes = [
  { path: '', redirectTo: 'exam', pathMatch: 'full' },
  { path: 'exam', component: AllExamsComponent },
    { path: 'exam/details/:id', component: ExamDetails }


  // { path: '**', component: NotFound }
];
