import { Routes } from '@angular/router';
import { AllExamsComponent } from './components/teacher/exams/exams';
import { StartExamComponent } from './components/student/start-exam/start-exam';
import { ExamResultComponent } from './components/student/exam-result/exam-result';

export const routes: Routes = [
  { path: '', redirectTo: 'exam', pathMatch: 'full' },
  { path: '', redirectTo: 'results', pathMatch: 'full' },
  { path: 'exam', component: StartExamComponent },
  { path: 'result', component: ExamResultComponent },
];