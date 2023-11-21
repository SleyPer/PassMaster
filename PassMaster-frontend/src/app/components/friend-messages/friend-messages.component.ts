import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationComponent } from '../notification/notification.component';
import { FriendListService } from 'src/app/services/friend-list.service';
import { Message } from 'src/app/models/message.model';
import { WebSocketService } from 'src/app/services/web-socket.service';


@Component({
  selector: 'app-friend-messages',
  templateUrl: './friend-messages.component.html',
  styleUrls: ['./friend-messages.component.scss']
})
export class FriendMessagesComponent implements OnInit, OnDestroy {
  friend: User = new User();
  connectedUser: User = new User();
  friendId: number = 0;
  connectedUserId: number = 0;
  isMenuOpen = false;

  message: string = "";
  messages: Message[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private friendListService: FriendListService,
    public webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    const token = this.authService.getToken();
    this.connectedUserId = this.authService.getDecodedToken(token).jti;
    this.userService.getUserById(this.connectedUserId).subscribe(data => {
      this.connectedUser = data;
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.friendId = Number(params.get('id'));
        this.webSocketService.openChatWithFriend(this.friendId);
        this.webSocketService.getMessages().subscribe((message: Message) => {
          this.messages.push(message);
        });
        return this.userService.getUserById(this.friendId);
      })
    ).subscribe({
      next: result => {
        this.friend = result;
      }
    });
  }

  sendMessage() {
    if (this.message) {
      const messageObject: Message = {
        //room: this.room,
        sender: this.connectedUser,
        content: this.message,
        timestamp: new Date(),
      };
      this.webSocketService.sendMessage(messageObject);
      this.message = '';
    }
  }

  deleteFriend() {
    if (this.friend) {
      this.friendListService.deleteFriend(this.friend).subscribe({
        next: result => {
          this.showNotification("Ami supprimé", "success");
          this.router.navigate(['/home']);
        },
        error: error => {
          this.showNotification("Erreur lors de l'ajout", "error");
        }
      })
    } else {
      this.showNotification("Ami inconnu", "error");
    }
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
