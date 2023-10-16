import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = new User();
  confirmPassword: string = "";

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  onSubmit() {
    if (this.verifyFields()) {
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
  }

  verifyFields(): boolean {
    if (this.user.firstName && this.user.lastName && this.user.mail && this.user.pass && this.confirmPassword) {
      if (this.user.pass === this.confirmPassword) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailPattern.test(this.user.mail)) {
          if (this.user.pass.length >= 8) {
            const uppercaseLetterPattern = /[A-Z]/;
            if (uppercaseLetterPattern.test(this.user.pass)) {
              const digitPattern = /\d/;
              if (digitPattern.test(this.user.pass)) {
                const specialCharacterPattern = /[^A-Za-z0-9]/;
                if (specialCharacterPattern.test(this.user.pass)) {
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
          this.showNotification("Le format de l'adresse email est incorrect", "error");
          return false;
        }
      } else {
        this.showNotification("Les mots de passe doivent être identiques", "error");
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

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
