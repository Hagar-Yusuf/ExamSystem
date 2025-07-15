import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';
goToRegister() {
  this.router.navigate(['/register']);
}
  login() {
this.auth.login(this.email, this.password).subscribe({
  next: (res) => {
    this.auth.storeToken(res.token);
    const role = this.auth.getRole();
    this.router.navigate([role === 'Admin' ? '/admin/exam' : '/student/exams']);
  },
  error: () => this.error = 'Invalid email or password'
});
  }
}
