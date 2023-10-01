import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chest } from 'src/app/chest/chest.model';

@Component({
  selector: 'app-chest-form',
  templateUrl: './chest-form.component.html',
  styleUrls: ['./chest-form.component.scss']
})
export class ChestFormComponent {
  @Output() chestAdded = new EventEmitter<Chest>();
  @Input() chest: Chest = new Chest();
  showPassword: boolean = false;

  onSubmit() {
    this.chestAdded.emit(this.chest);

    this.chest = new Chest();
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}
