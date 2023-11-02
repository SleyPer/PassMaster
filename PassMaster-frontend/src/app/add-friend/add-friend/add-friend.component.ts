import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { FriendListService } from 'src/app/friend-list.service';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  userMail: string = "";
  searchUsers: User[] = [];
  selectedUser: User = new User();

  userId: number = 0;

  constructor(private userService: UserService, private authService: AuthService, private friendListService: FriendListService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const token = this.authService.getToken();
    this.userId = this.authService.getDecodedToken(token).jti;
  }

  onSubmit() {
    if (this.selectedUser) {
      this.friendListService.addFriend(this.selectedUser).subscribe({
        next: result => {
          this.showNotification("Ami ajouté", "success");
          this.userMail = "";
        },
        error: error => {
          this.showNotification("Erreur lors de l'ajout", "error");
        }
      })
    } else {
      this.showNotification("Ami inconnu", "error");
    }
  }

  onMailInputChange() {
    if (this.userMail.trim() !== '') {
      this.userService.getUsersByMail(this.userMail).subscribe((result) => {
        this.searchUsers = result;
      });
    } else {
      this.searchUsers = [];
    }
  }

  onUserSelected(selectedUser: User) {
    this.selectedUser = selectedUser;
    if (selectedUser.mail) {
      this.userMail = selectedUser.mail;
      this.searchUsers = [];  
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