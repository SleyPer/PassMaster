import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Chest } from 'src/app/chest/chest.model';
import { ChestService } from 'src/app/chest/chest.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';

@Component({
  selector: 'app-chest-details',
  templateUrl: './chest-details.component.html',
  styleUrls: ['./chest-details.component.scss']
})
export class ChestDetailsComponent implements OnInit {

  chest: Chest = new Chest();
  chestId: number = 0;
  chestForm: {
    chest_name?: string,
    chest_description?: string,
    chest_username?: string,
    chest_password?: string,
    chest_link?: string
  } = {
    chest_name: '',
    chest_description: '',
    chest_username: '',
    chest_password: '',
    chest_link: ''
  };
  dialogRef!: any;

  constructor(
    private chestService: ChestService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.chestId = Number(params.get('id'));
      this.getChestDetails();
    })
  }

  getChestDetails() {
    this.chestService.getChestById(this.chestId).subscribe(
      (chest: Chest) => {
        this.chest = chest;
        this.chestForm = {
          chest_name: chest.chest_name,
          chest_description: chest.chest_description,
          chest_username: chest.chest_username,
          chest_password: chest.chest_password,
          chest_link: chest.chest_link
        };
      },
      (error: any) => {
        this.showNotification("Erreur lors de la récupération des données", "error");
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

  confirmDeleteChest(): void {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      data: { 
        message: 'Êtes-vous sûr de vouloir supprimer le coffre "' + this.chest.chest_name + '" ?',
        chestName: this.chest.chest_name
      }
    });
  
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.chestService.deleteChest(this.chest).subscribe(
          () => {
            this.showNotification('Coffre supprimé avec succès', 'success');
            this.router.navigate(['/chest']);
          },
          (error: any) => {
            this.showNotification('Erreur lors de la suppression da la catégorie', 'error');
          }
        );
      }
    });
  }
}
