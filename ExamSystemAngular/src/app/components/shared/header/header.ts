import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  navItems: any[] = [];
  role = '';
  isLoggedIn = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated();

    if (!this.isLoggedIn) return;

    this.role = this.auth.getRole();

    if (this.role === 'Student') {
      this.navItems = [
        { label: 'Take Exam', route: '/student/exams' },
        { label: 'My Results', route: '/student/results' }
      ];
    } else if (this.role === 'Admin') {
      this.navItems = [
        { label: 'Exams', route: '/admin/exam' },
        { label: 'Add Question', route: '/admin/addquestion' },
        { label: 'Students', route: '/admin/students' },
        { label: 'Results', route: '/admin/results' }
      ];
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
