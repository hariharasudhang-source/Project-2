import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private router: Router) {}
  service = inject(CommonService);

  onLogin() {
    let payload = {
      username: this.username,
      password: this.password
    }
    this.service.onLogin(payload).subscribe({
      next: (res) => {
        this.message = res.message;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => this.message = err.error.message
    });
  }
}
