import { Routes } from '@angular/router';
import { ExamDetails } from './components/teacher/exam-details/exam-details';
import { EditExam } from './components/teacher/edit-exam/edit-exam';
import { AddExam } from './components/teacher/add-exam/add-exam';
import { AllExamsComponent } from './components/teacher/exams/exams';

export const routes: Routes = [
  { path: '', redirectTo: 'exam', pathMatch: 'full' },
  { path: 'exam', component: AllExamsComponent },
    { path: 'exam/details/:id', component: ExamDetails },
      { path: 'exam/edit/:id', component: EditExam },
        { path: 'exam/add', component: AddExam } 


  // { path: '**', component: NotFound }
];
