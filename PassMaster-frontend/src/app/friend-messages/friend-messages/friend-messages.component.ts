import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Message } from 'src/app/message/message.model';
import { MessageService } from 'src/app/message/message.service';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-friend-messages',
  templateUrl: './friend-messages.component.html',
  styleUrls: ['./friend-messages.component.scss']
})
export class FriendMessagesComponent implements OnInit {
  friend: User = new User();
  connectedUser: User = new User();
  friendId: number = 0;
  connectedUserId: number = 0;

  content: string = "";

  sentMessages: Message[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService,
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
        return this.userService.getUserById(this.friendId);
      })
    ).subscribe({
      next: result => {
        this.friend = result;
      }
    });
  }

  onSubmit() {
    if (this.content) {
      var message = new Message();
      message.sender = this.connectedUserId;
      message.recipient = this.friendId;
      message.content = this.content;
      this.messageService.sendMessage(message).subscribe({
        next: result => {
          this.showNotification("Message envoyé", "success");
          this.sentMessages.push(message);
          this.content = "";
          console.log("sentMessages : ", this.sentMessages)
        },
        error: error => {
          this.showNotification("Erreur lors de l'envoi du message", "error");
        }
      })
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
}
