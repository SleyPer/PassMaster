import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotificationComponent } from '../notification/notification.component';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  userMail: string = "";
  userCode: string = "";
  newPass: string = "";
  confirmNewPass: string = "";
  code: string = "";
  showResetForm: boolean = false;

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) {

  }

  sendCode() {
    if (this.userMail) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(this.userMail)) {
        this.userService.sendResetPasswordMail(this.userMail).subscribe({
          next: result => {
            this.showResetForm = true;
            this.showNotification("Mail avec code de réinitialisation envoyé", "success");
          },
          error: error => {
            this.showNotification("Aucun utilisateur trouvé pour cette adresse mail", "error");
          }
        })
      } else {
        this.showNotification("Le format de l'adresse mail est incorrect", "error");
      }
    } else {
      this.showNotification("Veuillez renseigner votre adresse mail", "error");
    }
  }

  onSubmit() {
    if (this.verifyFields()) {
      this.userService.resetPassword(this.userMail, this.userCode, this.newPass).subscribe({
        next: result => {
          this.router.navigate(['/login']);
          this.showNotification("Mot de passe modifié", "success");
        },
        error: error => {
          this.showNotification("Le code de confirmation est incorrect", "error");
        }
      })
    }
  }

  verifyFields(): boolean {
    if (this.code && this.newPass && this.confirmNewPass) {
      if (this.newPass === this.confirmNewPass) {
        if (this.newPass.length >= 8) {
          const uppercaseLetterPattern = /[A-Z]/;
          if (uppercaseLetterPattern.test(this.newPass)) {
            const digitPattern = /\d/;
            if (digitPattern.test(this.newPass)) {
              const specialCharacterPattern = /[^A-Za-z0-9]/;
              if (specialCharacterPattern.test(this.newPass)) {
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

  goToLoginPage() {
    this.router.navigate(['/login']);
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
