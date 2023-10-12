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
  displayedChests: Chest[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalPages: number = 0;
  search: string = "";

  constructor(
    private chestService: ChestService,
    private router: Router
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
      this.totalPages = Math.ceil(this.chests.length / this.itemsPerPage);
      this.displayedChests = this.chests.slice(0, this.itemsPerPage);
    });
  }

  showNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedChests = this.chests.slice(startIndex, endIndex);
    }
  }

  showPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedChests = this.chests.slice(startIndex, endIndex);
    }
  }

  viewChestDetails(chest: Chest) {
    this.router.navigate(['/chest', chest.id]);
  }
}
