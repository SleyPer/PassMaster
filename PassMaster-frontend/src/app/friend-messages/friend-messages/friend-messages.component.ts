import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-friend-messages',
  templateUrl: './friend-messages.component.html',
  styleUrls: ['./friend-messages.component.scss']
})
export class FriendMessagesComponent implements OnInit {
  friend: User = new User();
  friendId: number = 0;

  msg: string = "";

  constructor(private userService: UserService, private route: ActivatedRoute) {

  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.friendId = idString ? parseInt(idString, 10) : 0;
    });
    this.userService.getUserById(this.friendId).subscribe({
      next: result => {
        this.friend = result;
      }
    })
  }


}
