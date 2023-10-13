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
    name?: string,
    description?: string,
    username?: string,
    password?: string,
    link?: string
  } = {
    name: '',
    description: '',
    username: '',
    password: '',
    link: ''
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
          name: chest.name,
          description: chest.description,
          username: chest.username,
          password: chest.password,
          link: chest.link
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
        message: 'Êtes-vous sûr de vouloir supprimer le coffre "' + this.chest.name + '" ?',
        chestName: this.chest.name
      }
    });
  
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.chestService.deleteChest(this.chest).subscribe(
          () => {
            this.showNotification('Coffre supprimé avec succès', 'success');
            this.router.navigate(['/home']);
          },
          (error: any) => {
            this.showNotification('Erreur lors de la suppression da la catégorie', 'error');
          }
        );
      }
    });
  }
}
