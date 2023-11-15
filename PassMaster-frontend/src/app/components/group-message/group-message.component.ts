import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';
import { Room } from 'src/app/models/room.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
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
  room: Room = new Room();

  @ViewChild('userListPopup') userListPopup!: ElementRef;
  userListVisible = false;

  constructor(
    private webSocketService: WebSocketService,
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
        this.roomService.getRoomById(groupIdParam).subscribe({
          next: result => {
            this.room = result;
          }
        });
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

  openUserList() {
    this.userListVisible = true;
  }
  
  closeUserList(event: Event) {
    if (event.target !== event.currentTarget) return;
    this.userListVisible = false;
  }

  @HostListener("window:keydown", ['$event'])
  closeFromEchap(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.userListVisible) {
      this.userListVisible = false;
    }
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}
