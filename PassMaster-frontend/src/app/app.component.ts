import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PassMaster';
  login: boolean = true;
  register: boolean = false;

  constructor(private authService: AuthService) {

  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  changeForm() {
    this.login = !this.login;
    this.register = !this.register;
  }
}
