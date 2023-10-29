import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { Chest } from 'src/app/chest/chest.model';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';

@Component({
  selector: 'app-chest-form',
  templateUrl: './chest-form.component.html',
  styleUrls: ['./chest-form.component.scss']
})
export class ChestFormComponent {
  @Output() chestAdded = new EventEmitter<Chest>();
  @Input() chest: Chest = new Chest();

  constructor(
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar
  ) { }

  onSubmit() {
    if (this.chest.link !== undefined && this.chest.link.trim() !== '') {
      this.chest.link = 'http://' + this.chest.link;
    }
    this.chestAdded.emit(this.chest);

    this.chest = new Chest();
  }

  copyField(fieldName: string) {
    const field = document.getElementById(fieldName) as HTMLInputElement;
    if (field.value) {
      this.clipboardService.copyFromContent(field.value);
      this.showCopyNotification("Champ copié", "success");
    } else {
      this.showCopyNotification("Renseignez le champ pour le copier", "error");
    }
  }

  showCopyNotification(msg: string, type: string) {
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
