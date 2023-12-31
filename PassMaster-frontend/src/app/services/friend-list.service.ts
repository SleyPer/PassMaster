import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';


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

  deleteFriend(selectedUser: User) {
    if (selectedUser) {
      for (const u of this.friends) {
        if (u.id === selectedUser.id) {
          this.friends.splice(this.friends.indexOf(u), 1);
        }
      }
    }
    return this.userService.deleteFriend(this.userId, selectedUser)
  }
}
