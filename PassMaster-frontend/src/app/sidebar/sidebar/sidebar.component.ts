import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  showAccueilSubTabs: boolean = false;
  showChestSubTabs: boolean = false;
  showGeneratorSubTabs: boolean = false;
  showAccountSubTabs: boolean = false;

  isHomeSelected: boolean = false;
  isChestSelected: boolean = false;
  isGeneratorSelected: boolean = false;
  isAccountSelected: boolean = false;

    constructor(private router: Router, private authService: AuthService) {
        this.router.events.subscribe((val) => {
            this.isHomeSelected = this.router.url === '/home';
            this.isChestSelected = this.router.url === '/chests';
            this.isGeneratorSelected = this.router.url === '/generator';
            this.isAccountSelected = this.router.url === '/account';
        });
    }

    isAuthenticated() {
      return this.authService.isAuthenticated();
    }

    logout() {
      this.authService.deleteToken();
      this.router.navigate(['/home']);
    }
}
