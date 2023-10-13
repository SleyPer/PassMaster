import { Component, OnInit } from '@angular/core';
import { ChestService } from '../chest.service';
import { Chest } from '../chest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chest',
  templateUrl: './chest.component.html',
  styleUrls: ['./chest.component.scss']
})
export class ChestComponent implements OnInit {
  chests: Chest[] = [];
  search: string = "";

  constructor(
    private chestService: ChestService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadChests();
  }

  createChest() {
    this.router.navigate(["/create"]);
  }

  loadChests() {
    this.chestService.getAllChests().subscribe(data => {
      this.chests = data;
    });
  }

  viewChestDetails(chest: Chest) {
    this.router.navigate(['/chest', chest.id]);
  }
}
