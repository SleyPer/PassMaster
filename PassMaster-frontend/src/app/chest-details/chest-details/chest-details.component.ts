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
  originalChest: Chest = new Chest();
  chestId: number = 0;
  dialogRef!: any;
  isEditing: boolean = false;

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
            this.showNotification('Erreur lors de la suppression du coffre', 'error');
          }
        );
      }
    });
  }

  editChest() {
    if (this.isEditing) {
      this.chest = Object.assign({}, this.originalChest);
    } else {
      this.originalChest = Object.assign({}, this.chest);
    }
    this.isEditing = !this.isEditing;
  }


  submit() {
    if (this.chest.name) {
      this.chestService.updateChest(this.chest).subscribe(
        result => {
          this.chest = result;
          this.showNotification('Coffre modifié avec succès', 'success');
        },
        error => {
          this.showNotification('Erreur lors de la modification du coffre', 'error');
        }
      )
    } else {
      this.showNotification('Veuillez renseigner le nom du coffre', 'error');
    }
  }

  cancelEdit() {
    this.chest = Object.assign({}, this.originalChest);
    this.isEditing = false;
  }

  copyToClipboard(field: string) {
    console.log("je suis la")
    const text = field === 'name' ? this.chest.name :
      field === 'description' ? this.chest.description :
        field === 'username' ? this.chest.username :
          field === 'password' ? this.chest.password :
            field === 'link' ? this.chest.link : '';

    const tempTextArea = document.createElement('textarea');
    if (text) {
      tempTextArea.value = text;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      this.showNotification('Champ copié', 'success');
    } else {
      this.showNotification('Veuillez renseigner le champ pour le copier', 'error');
    }
  }

}
