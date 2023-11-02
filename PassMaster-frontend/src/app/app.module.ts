import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { HomeComponent } from './home/home/home.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { GeneratorComponent } from './generator/generator/generator.component';
import { AccountComponent } from './account/account/account.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { ValidateComponent } from './validate/validate/validate.component';
import { TokenInterceptor } from './interceptor/token-interceptor.service';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog/logout-dialog.component';
import { FriendsListComponent } from './friends-list/friends-list/friends-list.component';
import { AddFriendComponent } from './add-friend/add-friend/add-friend.component';
import { FriendMessagesComponent } from './friend-messages/friend-messages/friend-messages.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    GeneratorComponent,
    AccountComponent,
    NotificationComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    RegisterComponent,
    ValidateComponent,
    LogoutDialogComponent,
    FriendsListComponent,
    AddFriendComponent,
    FriendMessagesComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
