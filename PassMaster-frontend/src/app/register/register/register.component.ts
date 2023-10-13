import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterDirective } from 'src/app/directive/register.directive';
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
    private router: Router,
    // private registerDirective: RegisterDirective
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
    // return (this.registerDirective.verifyFields(
    //   this.user.firstName, this.user.lastName, this.user.mail, this.user.pass, this.confirmPassword)
    // )
    return true;
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
