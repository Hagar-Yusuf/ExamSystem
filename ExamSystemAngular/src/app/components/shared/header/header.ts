import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  studentNavItems: any[] = [];
  adminNavItems: any[] = [];

  ngOnInit() {
    this.studentNavItems = [
      { label: 'Exams', route: '/exam' },
      { label: 'Results', route: '/results' }
    ];

    this.adminNavItems = [
      { label: 'Exams', route: '/admin/exam'},
      { label: 'Questions', route: '/admin/questions'},
      { label: 'Students', route: '/admin/students' },
      { label: 'Results', route: '/admin/results'},
    ];
  }
}
