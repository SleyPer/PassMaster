import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';
import { Room } from 'src/app/models/room.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.scss'],
})
export class GroupMessageComponent implements OnInit, OnDestroy {
  connectedUserId: number = 0;
  connectedUser: User = new User();

  connectedUsers: string[] = [];

  message: string = '';
  messages: Message[] = [];

  groupId: string = "";
  room: Room = new Room();

  userListVisible = false;

  constructor(
    private webSocketService: WebSocketService,
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const token = this.authService.getToken();
    this.connectedUserId = this.authService.getDecodedToken(token).jti;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const groupIdParam = params.get('id');
      if (groupIdParam !== null) {
        this.groupId = groupIdParam;
        this.roomService.getRoomById(groupIdParam).subscribe({
          next: result => {
            this.room = result;
            this.connectedUsers = result.sessionIds!;

            this.messageService.getMessagesByRoomId(this.room.id!).subscribe({
              next: result => {
                this.messages = result;
              },
              error: error => {
                this.showNotification("Impossible de charger les messages existants", "error");
              }
            });
          },
          error: error => {
            this.showNotification("Impossible de charger les données du groupe", "error");
          }
        });
        this.webSocketService.initializeWebSocketConnection(this.groupId);
        this.webSocketService.getMessages().subscribe((message: Message) => {
          this.messages.push(message);
        });
        this.userService.getUserById(this.connectedUserId).subscribe(data => {
          this.connectedUser = data;
        });
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  sendMessage() {
    if (this.message) {
      const messageObject: Message = {
        room: this.room,
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

  isUserConnected(user: User): boolean {
    for (const session of this.connectedUsers) {
      console.log(session, " - ", user.sessionId)
      if (session === user.sessionId)
        return true;
    }

    return false;
  }

  showNotification(msg: string, type: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 5000,
      data: {
        message: msg,
        icon: type == "success" ? "check" : "close"
      },
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: type == "success" ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}
