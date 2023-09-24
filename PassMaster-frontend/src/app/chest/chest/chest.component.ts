import { Component, OnInit } from '@angular/core';
import { ChestService } from '../chest.service';
import { Chest } from '../chest.model';

@Component({
  selector: 'app-chest',
  templateUrl: './chest.component.html',
  styleUrls: ['./chest.component.scss']
})
export class ChestComponent implements OnInit {

  chests: Chest[] = [];

  constructor(private chestService: ChestService) {

  }

  ngOnInit() {
    this.getAllChests();
  }

  getAllChests() {
    this.chestService.getAllChests().subscribe(data => {
      this.chests = data;
    });
  }
}