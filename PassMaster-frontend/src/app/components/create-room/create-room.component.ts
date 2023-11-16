import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { RoomListService } from 'src/app/services/room-list.service';
import { RoomService } from 'src/app/services/room.service';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { FriendListService } from 'src/app/services/friend-list.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent {
  connectedUserId: number = 0;
  connectedUser: User = new User();

  room: Room = new Room();
  friendsAdded: User[] = [];

  constructor(
    private roomService: RoomService,
    private roomListService: RoomListService,
    private friendListService: FriendListService,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.friends;

    const token = this.authService.getToken();
    this.connectedUserId = this.authService.getDecodedToken(token).jti;
    this.userService.getUserById(this.connectedUserId).subscribe(data => {
      this.connectedUser = data;
      this.friendsAdded.push(data);
    });

    this.room.id = this.generateRandomString();
  }

  generateRandomString() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const randomLetters = Math.random().toString(36).substring(2, 4).toUpperCase();
    const randomString = `${randomNumber}-${randomLetters}`;

    return randomString;
  }

  onSubmit() {
    if (this.verifyFields()) {
      this.room.users = this.friendsAdded;
      this.roomService.addRoom(this.room).subscribe({
        next: result => {
          this.roomListService.addRoom(result);
          this.showNotification("Groupe créé avec succès", "success");
          this.router.navigate(['/group-message/', this.room.id]);
        },
        error: error => {
          this.showNotification("Erreur lors de la création du groupe", "error");
        }
      });
    }
  }

  selectUser(user: User) {
    if (this.friendsAdded) {
      for (const u of this.friendsAdded) {
        if (u.id === user.id) {
          this.friendsAdded.splice(this.friendsAdded.indexOf(u), 1);
          return;
        }
      }
      this.friendsAdded.push(user);
    }
  }

  isUserSelected(user: User) {
    const isSelected = this.friendsAdded && this.friendsAdded.some(u => u.id === user.id);

    if (isSelected) {
      this.renderer.addClass(this.el.nativeElement, 'selected-user');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'selected-user');
    }

    return isSelected;
  }

  get friends() {
    return this.friendListService.friends;
  }

  verifyFields() {
    if (this.room.id) {
      if (this.room.name) {
        if (this.friendsAdded.length > 2) {
          return true;
        } else {
          this.showNotification("Vous devez ajouter au moins deux amis", "error");
          return false;
        }
      } else {
        this.showNotification("Veuillez saisir un nom", "error");
        return false;
      }
    } else {
      this.showNotification("Veuillez saisir un id", "error");
      return false;
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
