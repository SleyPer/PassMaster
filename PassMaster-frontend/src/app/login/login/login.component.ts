import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = new User();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  onSubmit() {
    if (this.user.mail && this.user.pass) {
      this.userService.login(this.user.mail, this.user.pass).subscribe(
        () => {
          this.showNotification("Bienvenue !", "success");
          this.router.navigate(['/home']);
        },
        (error: any) => {
          this.showNotification("Erreur lors de la création de votre compte", "error");
        }
      )
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
