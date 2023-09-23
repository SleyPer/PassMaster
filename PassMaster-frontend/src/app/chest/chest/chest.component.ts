import { Component, OnInit } from '@angular/core';
import { ChestService } from '../chest.service';
import { Chest } from '../chest.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-chest',
  templateUrl: './chest.component.html',
  styleUrls: ['./chest.component.scss']
})
export class ChestComponent implements OnInit {

  chests: Chest[] = [];

  constructor(private chestService: ChestService) {

  }

  async ngOnInit() {
    await this.getAllChests();
    console.log(this.chests)
  }

  async getAllChests() {
    const data = await lastValueFrom(this.chestService.getAllChests());
    this.chests = data;
  }
}