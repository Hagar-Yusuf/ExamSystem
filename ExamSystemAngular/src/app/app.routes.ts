import { Routes } from '@angular/router';

// Shared Components
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';

// Admin Components
import { AllExamsComponent } from './components/teacher/exams/exams';
import { ExamDetails } from './components/teacher/exam-details/exam-details';
import { EditExam } from './components/teacher/edit-exam/edit-exam';
import { AddExam } from './components/teacher/add-exam/add-exam';
import { McqList } from './components/teacher/MCQQuestion/mcq-list/mcq-list';
import { McqDetails } from './components/teacher/MCQQuestion/mcq-details/mcq-details';
import { McqAdd } from './components/teacher/MCQQuestion/mcq-add/mcq-add';
import { McqEdit } from './components/teacher/MCQQuestion/mcq-edit/mcq-edit';

// Auth Guard
import { authGuard } from './shared/auth-guard';

export const routes: Routes = [
  // Public
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Admin Routes
  { path: 'admin/exam', component: AllExamsComponent, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: 'admin/exam/details/:id', component: ExamDetails, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: 'admin/exam/edit/:id', component: EditExam, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: 'admin/exam/add', component: AddExam, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: 'admin/mcq', component: McqList, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: 'admin/mcq/view/:id', component: McqDetails, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: 'admin/mcq/add', component: McqAdd, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: 'admin/mcq/edit/:id', component: McqEdit, canActivate: [authGuard], data: { role: 'Admin' } },

  // ✅ New Admin Lazy Routes
  {
    path: 'admin/students',
    loadComponent: () => import('./components/teacher/students/students').then(m => m.Students),
    canActivate: [authGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'admin/results',
    loadComponent: () => import('./components/teacher/results/results').then(m => m.Results),
    canActivate: [authGuard],
    data: { role: 'Admin' }
  },

  // Student Routes
  {
    path: 'student/exams',
    loadComponent: () => import('./components/student/student-landing/student-landing').then(m => m.StudentLanding),
    canActivate: [authGuard],
    data: { role: 'Student' }
  },
  {
    path: 'student/exams/start/:id',
    loadComponent: () => import('./components/student/start-exam/start-exam').then(m => m.StartExamComponent),
    canActivate: [authGuard],
    data: { role: 'Student' }
  },
  {
    path: 'student/results',
    loadComponent: () => import('./components/student/exam-result/exam-result').then(m => m.ExamResultComponent),
    canActivate: [authGuard],
    data: { role: 'Student' }
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
