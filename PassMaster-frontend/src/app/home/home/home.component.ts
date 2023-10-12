import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.deleteToken();
    
  }

  register() {
    this.router.navigate(['/register']);
  }

  isAuthenticated() {
    console.log(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }
}
