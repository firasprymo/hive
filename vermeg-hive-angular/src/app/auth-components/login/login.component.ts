import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  loginError: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password)
        .subscribe(
          () => {
            console.log('Login successful');
            this.router.navigate(['/dashboard']); // Navigate to dashboard upon successful login
          },
          (error) => {
            console.error('Login failed:', error);
            this.loginError = 'Invalid username or password'; // Set error message for display
          }
        );
    }
  }
}
