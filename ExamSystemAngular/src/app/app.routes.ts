import { Routes } from '@angular/router';
import { AllExamsComponent } from './components/teacher/exams/exams';

export const routes: Routes = [
  { path: '', redirectTo: 'exam', pathMatch: 'full' }, 
  { path: 'exam', component: AllExamsComponent },
    // { path: 'exam/create', component: CreateExam },

//   { path: 'exam/details/:id', component: ExamDetails }, 
//   { path: '**', component: NotFound }
];