import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User = new User();
  isExpanded: boolean = false;

  oldPassword: string = "";
  newPassword: string = "";
  confirmNewPassword: string = "";

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.userService.getUserById(this.getIdUser()).subscribe(data => {
      this.user = data;
    });
  }

  getIdUser() {
    return this.authService.getDecodedToken(this.authService.getToken()).jti;
  }

  showForm() {
    this.isExpanded = !this.isExpanded;
  }

  onSubmit() {

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
