import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html'
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirm = '';
  error = '';

  register() {
    if (this.password !== this.confirm) {
      this.error = 'Passwords do not match';
      return;
    }

    this.auth.register({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.error = 'Registration failed'
      });
  }
  goToLogin() {
  this.router.navigate(['/login']);
}

}
