import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PassMaster';

  constructor(private authService: AuthService) {

  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
