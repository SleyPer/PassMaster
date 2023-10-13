import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NotificationComponent } from '../notification/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appRegisterDirective]'
})
export class RegisterDirective {

  constructor(private el: ElementRef, private renderer: Renderer2, private snackBar: MatSnackBar) { }

  verifyFields(
    firstName: string | undefined,
    lastName: string | undefined,
    mail: string | undefined,
    pass: string | undefined,
    confirmPassword: string | undefined
  ): boolean {
    if (firstName && lastName && mail && pass && confirmPassword) {
      if (pass === confirmPassword) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailPattern.test(mail)) {
          if (pass.length >= 8) {
            const uppercaseLetterPattern = /[A-Z]/;
            if (uppercaseLetterPattern.test(pass)) {
              const digitPattern = /\d/;
              if (digitPattern.test(pass)) {
                const specialCharacterPattern = /[^A-Za-z0-9]/;
                if (specialCharacterPattern.test(pass)) {
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
}
