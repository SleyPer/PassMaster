import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  confirmationInput: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, chestName: string }
  ) { }

  onSubmit() {

  }

  isConfirmationValid(): boolean {
    return this.confirmationInput === this.data.chestName;
  }

  onDelete() {
    if (this.isConfirmationValid()) {
      this.dialogRef.close(true);
    } else {
    }
  }
}
