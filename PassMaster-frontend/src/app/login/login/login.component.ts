import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.user.mail && this.user.pass) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(this.user.mail)) {
        this.userService.login(this.user.mail, this.user.pass).subscribe(
          (response) => {
            this.authService.setToken(response.bearer);
            this.authService.setRefreshToken(response.refresh);
            this.showNotification("Bienvenue !", "success");
            this.router.navigate(['/home']);
          },
          (error: any) => {
            this.showNotification("Erreur lors de la connexion à votre compte", "error");
          }
        )
      } else {
        this.showNotification("Le format de l'adresse mail est incorrect", "error");
      }
    } else {
      this.showNotification("Veuillez remplir tous les champs", "error");
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

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }

  goToResetPasswordPage() {
    this.router.navigate(['/reset/password']);
  }
}
