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
import { ChestComponent } from './chest/chest/chest.component';
import { GeneratorComponent } from './generator/generator/generator.component';
import { AccountComponent } from './account/account/account.component';
import { ChestFormComponent } from './chest-form/chest-form/chest-form.component';
import { CreateChestComponent } from './create-chest/create-chest/create-chest.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { ChestDetailsComponent } from './chest-details/chest-details/chest-details.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { ValidateComponent } from './validate/validate/validate.component';
import { TokenInterceptor } from './interceptor/token-interceptor.service';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog/logout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    ChestComponent,
    GeneratorComponent,
    AccountComponent,
    ChestFormComponent,
    CreateChestComponent,
    NotificationComponent,
    ChestDetailsComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    RegisterComponent,
    ValidateComponent,
    LogoutDialogComponent,
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
