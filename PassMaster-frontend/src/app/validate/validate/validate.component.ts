import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { UserService } from 'src/app/user/user.service';
import { Activation } from 'src/app/activation/activation.model';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent {
  activation: Activation = new Activation();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    this.userService.activate(this.activation).subscribe(
      () => {
        this.showNotification("Votre compte a été vérifié avec succès", "success");
        this.router.navigate(['/home']);
      },
      (error) => {
        this.showNotification("Erreur lors de la vérification de votre compte", "error");
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
