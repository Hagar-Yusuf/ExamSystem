import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin-service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html'
})
export class Students implements OnInit {
  private adminService = inject(AdminService);
  students: any[] = [];
  error = '';

  ngOnInit() {
    this.adminService.getAllStudents().subscribe({
      next: data => this.students = data,
      error: () => this.error = 'Failed to load students'
    });
  }
}
