import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Chest } from 'src/app/chest/chest.model';
import { ChestService } from 'src/app/chest/chest.service';
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

  constructor(
    private chestService: ChestService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
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
}
