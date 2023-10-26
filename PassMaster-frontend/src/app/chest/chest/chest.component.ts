import { Component, OnInit } from '@angular/core';
import { ChestService } from '../chest.service';
import { Chest } from '../chest.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadChests();
    if (this.authService.getToken()) {
    }
  }

  createChest() {
    this.router.navigate(["/create"]);
  }

  loadChests() {
    const token = this.authService.getToken();
    const userId = this.authService.getDecodedToken(token).jti;
    this.chestService.getChestsByUserId(userId).subscribe(data => {
      this.chests = data;
    });
  }

  viewChestDetails(chest: Chest) {
    this.router.navigate(['/chest', chest.id]);
  }

  onChestCreated() {
    this.loadChests();
  }

  searchChests() {
    if (this.search.trim() === '') {
      this.loadChests();
    } else {
      const searchTerm = this.search.toLowerCase();
      this.chests = this.chests.filter(chest => chest.name ? chest.name.toLowerCase().includes(searchTerm) : "");
    }
  }  
}
