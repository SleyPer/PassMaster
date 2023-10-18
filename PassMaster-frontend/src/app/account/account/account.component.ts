import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { ImageDataService } from 'src/app/image-data/image-data.service';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  selectedImage?: File;
  user: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private imageDataService: ImageDataService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.userService.getUserById(this.getIdUser()).subscribe(data => {
      this.user = data;
    });
  }

  getIdUser() {
    return this.authService.getDecodedToken(this.authService.getToken()).jti;
  }

  modifyPassword() {

  }

  onImageSelected(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.showNotification("Vous devez sélectionner une image", "error");
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.showNotification("Seules les images sont supportées", "error");
      return;
    }

    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (this.selectedImage) {
      this.imageDataService.uploadImage(this.selectedImage).subscribe(
        result => {
          this.showNotification("Image de profil modifiée", "success");
        },
        error => {
          this.showNotification("Erreur lors de la modification de l'image de profil", "error");
        }
      )
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
