import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Chest } from 'src/app/chest/chest.model';
import { ChestService } from 'src/app/chest/chest.service';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';

@Component({
  selector: 'app-create-chest',
  templateUrl: './create-chest.component.html',
  styleUrls: ['./create-chest.component.scss']
})
export class CreateChestComponent {

  chestName: string = '';
  chestDescription: string = '';
  chestUsername: string = '';
  chestPassword: string = '';
  chestLink: string = '';

  constructor(
    private chestService: ChestService,
    private snackBar: MatSnackBar
  ) {

  }

  onChestAdded(chest: Chest) {
    this.chestService.createChest(chest).subscribe(
      (response) => {
        this.showNotification("Coffre créé avec succès", "success");
      },
      (error) => {
        this.showNotification("Erreur lors de la création du coffre", "error");
      }
    );

    this.resetForm();
  }

  resetForm() {
    this.chestName = '';
    this.chestDescription = '';
    this.chestUsername = '';
    this.chestPassword = '';
    this.chestLink = '';
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
