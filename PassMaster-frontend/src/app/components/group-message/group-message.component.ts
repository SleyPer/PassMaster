import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.scss'],
})
export class GroupMessageComponent implements OnInit, OnDestroy {
  connectedUserId: number = 0;
  connectedUser: User = new User();

  message: string = '';
  messages: Message[] = [];

  connectedUsers: number[] = [];

  groupId: string = "";

  constructor(private webSocketService: WebSocketService, private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    const token = this.authService.getToken();
    this.connectedUserId = this.authService.getDecodedToken(token).jti;
    this.userService.getUserById(this.connectedUserId).subscribe(data => {
      this.connectedUser = data;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const groupIdParam = params.get('id');
      if (groupIdParam !== null) {
        this.groupId = groupIdParam;
        this.webSocketService.initializeWebSocketConnection(this.groupId);
  
        this.webSocketService.getMessages().subscribe((message: Message) => {
          this.messages.push(message);
        });
  
        this.connectedUsers = this.webSocketService.connectedUsersId;
        console.log(this.connectedUsers);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
  

  sendMessage() {
    if (this.message) {
      const messageObject: Message = {
        senderId: this.connectedUserId,
        sender: this.connectedUser,
        content: this.message,
        timestamp: new Date(),
      };
      this.webSocketService.sendMessage(messageObject);
      this.message = '';
    }
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}
