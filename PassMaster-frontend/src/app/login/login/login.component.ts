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
    this.userService.register(this.user).subscribe(
      () => {
        this.showNotification("Un mail vous a été envoyé avec votre code d'activation !", "success");
        this.router.navigate(['/validate']);
      },
      (error: any) => {
        this.showNotification("Erreur lors de la création de votre compte", "error");
      }
    )
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
