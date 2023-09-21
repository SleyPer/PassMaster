import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

constructor() { }

  showChestSubTabs: boolean = false;
  showGeneratorSubTabs: boolean = false;
  showAccountSubTabs: boolean = false;

  toggleChestSubTabs() {
    this.showChestSubTabs = !this.showChestSubTabs;
    this.showGeneratorSubTabs = false;
    this.showAccountSubTabs = false;
  }

  toggleGeneratorSubTabs() {
    this.showGeneratorSubTabs = !this.showGeneratorSubTabs;
    this.showChestSubTabs = false
    this.showAccountSubTabs = false;
  }

  toggleAccountSubTabs() {
    this.showAccountSubTabs = !this.showAccountSubTabs;
    this.showChestSubTabs = false;
    this.showGeneratorSubTabs = false;
  }
}
