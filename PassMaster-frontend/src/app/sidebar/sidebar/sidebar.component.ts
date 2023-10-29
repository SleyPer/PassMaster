import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LogoutDialogComponent } from 'src/app/logout-dialog/logout-dialog/logout-dialog.component';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  showHomeSubTabs: boolean = false;
  showGeneratorSubTabs: boolean = false;
  showAccountSubTabs: boolean = false;
  showFriendsSubTabs: boolean = false;
  showMessagesSubTabs: boolean = false;

  isHomeSelected: boolean = false;
  isGeneratorSelected: boolean = false;
  isAccountSelected: boolean = false;
  isFriendsSelected: boolean = false;
  isMessagesSelected: boolean = false;

  dialogRef!: any;

  constructor(private router: Router,
    private authService: AuthService, 
    private dialog: MatDialog, 
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.router.events.subscribe((val) => {
      this.isHomeSelected = this.router.url === '/home';
      this.isGeneratorSelected = this.router.url === '/generator';
      this.isAccountSelected = this.router.url === '/account';
    });
  }

  toggleSubMenu(menu: string): void {
    switch (menu) {
      case 'home':
        this.showHomeSubTabs = !this.showHomeSubTabs;
        break;
      case 'generator':
        this.showGeneratorSubTabs = !this.showGeneratorSubTabs;
        break;
      case 'account':
        this.showAccountSubTabs = !this.showAccountSubTabs;
        break;
      case 'friends':
        this.showFriendsSubTabs = !this.showFriendsSubTabs;
        break;
      case 'messages':
        this.showMessagesSubTabs = !this.showMessagesSubTabs;
        break;
      default:
        break;
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.userService.logout().subscribe(
      result => {
        this.authService.deleteToken();
        this.router.navigate(['/login']);
        this.showNotification("A bientôt", "success");
      },
      error => {
        this.showNotification("Erreur lors de la déconnexion", "error");
      }
    )
  }

  confirmLogout(): void {
    this.dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '40%',
      data: {
        message: 'Êtes-vous sûr de vouloir vous déconnecter ?'
      }
    });

    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.logout();
      }
    });
  }

  showNotification(msg: string, type: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 5000,
      data: {
        message: msg,
        icon: type == "success" ? "check" : "close"
      },
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: type == "success" ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}