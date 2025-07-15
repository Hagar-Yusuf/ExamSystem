import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin-service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.html'
})
export class Results implements OnInit {
  private adminService = inject(AdminService);
  results: any[] = [];
  error = '';

  ngOnInit() {
    this.adminService.getAllResults().subscribe({
      next: data => this.results = data,
      error: () => this.error = 'Failed to load results'
    });
  }
}
