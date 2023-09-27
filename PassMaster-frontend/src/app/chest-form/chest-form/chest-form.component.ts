import { Component, EventEmitter, Output } from '@angular/core';
import { Chest } from 'src/app/chest/chest.model';

@Component({
  selector: 'app-chest-form',
  templateUrl: './chest-form.component.html',
  styleUrls: ['./chest-form.component.scss']
})
export class ChestFormComponent {
  @Output() chestAdded = new EventEmitter<Chest>();
  chest: Chest = new Chest();

  onSubmit() {
    this.chestAdded.emit(this.chest);
    
    this.chest = new Chest();
  }
}
