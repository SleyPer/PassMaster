import { Injectable } from '@angular/core';
import { User } from './user/user.model';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendListService {

  friends: User[] = [];
  userId: number;

  constructor(private userService: UserService, private authService: AuthService) {
    const token = this.authService.getToken();
    this.userId = this.authService.getDecodedToken(token).jti;
    this.userService.getFriendsByUserId(this.userId).subscribe(data => {
      this.friends = data;
    });
  }

  addFriend(selectedUser: User) {
    if (selectedUser) {
      this.friends.push(selectedUser);
    }
    return this.userService.addFriend(this.userId, selectedUser);
  }
}
