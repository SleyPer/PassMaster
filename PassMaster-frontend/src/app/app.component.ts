import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChatMaster';
  friendsList: boolean = true;
  groupsList: boolean = false;

  constructor(private authService: AuthService) {

  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  showFriendsList() {
    this.groupsList = false;
    this.friendsList = true;
  }

  showGroupsList() {
    this.friendsList = false;
    this.groupsList = true;
  }
}
