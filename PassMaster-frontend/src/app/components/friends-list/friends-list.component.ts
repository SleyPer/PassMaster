import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FriendListService } from 'src/app/services/friend-list.service';


@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent {
  search: string = "";

  constructor(
    private router: Router,
    private friendListService: FriendListService
  ) {
    this.friends;
  }

  addFriend() {
    this.router.navigate(["/add"]);
  }

  openMessages(friend: User) {
    this.router.navigate(['/messages', friend.id]);
  }

  searchFriends() {
    if (this.search.trim() === '') {
      this.friends;
    } else {
      const searchTerm = this.search.toLowerCase();
      this.friends = this.friends.filter(friend => friend.firstName ?
        friend.firstName.toLowerCase().includes(searchTerm) : "");
    }


  }

  get friends() {
    return this.friendListService.friends;
  }

  set friends(friends: User[]) {
    this.friendListService.friends = friends;
  }
}
