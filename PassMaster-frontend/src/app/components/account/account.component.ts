import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationComponent } from '../notification/notification.component';


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
    if (this.verifyFields()) {
      this.user.pass = this.newPassword;
      this.userService.updateUser(this.user).subscribe(
        result => {
          this.showNotification("Mot de passe modifié", "success");
        },
        error => {
          this.showNotification("Erreur lors de la modification du mot de passe", "error");
        }
      )
    }
  }

  verifyFields(): boolean {
    if (this.oldPassword && this.newPassword && this.confirmNewPassword) {
      if (this.newPassword === this.confirmNewPassword) {
        if (this.newPassword.length >= 8) {
          const uppercaseLetterPattern = /[A-Z]/;
          if (uppercaseLetterPattern.test(this.newPassword)) {
            const digitPattern = /\d/;
            if (digitPattern.test(this.newPassword)) {
              const specialCharacterPattern = /[^A-Za-z0-9]/;
              if (specialCharacterPattern.test(this.newPassword)) {
                return true;
              } else {
                this.showNotification("Le mot de passe doit contenir au moins un caractère spécial", "error");
                return false;
              }
            } else {
              this.showNotification("Le mot de passe doit contenir au moins un chiffre", "error");
              return false;
            }
          } else {
            this.showNotification("Le mot de passe doit contenir au moins une lettre majuscule", "error");
            return false;
          }
        } else {
          this.showNotification("Le mot de passe doit faire 8 caractères minimum", "error");
          return false;
        }
      } else {
        this.showNotification("Les nouveaux mots de passe doivent être identiques", "error");
        return false;
      }
    } else {
      this.showNotification("Veuillez remplir tous les champs", "error");
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
