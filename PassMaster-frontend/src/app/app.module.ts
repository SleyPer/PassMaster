import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountComponent } from './components/account/account.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FriendMessagesComponent } from './components/friend-messages/friend-messages.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ValidateComponent } from './components/validate/validate.component';
import { TokenInterceptor } from './services/token-interceptor.service';
import { GroupMessageComponent } from './components/group-message/group-message.component';

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
    GroupMessageComponent,
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
    MatDialogModule,
    ReactiveFormsModule,
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
