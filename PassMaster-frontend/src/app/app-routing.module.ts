import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { GeneratorComponent } from './generator/generator/generator.component';
import { AccountComponent } from './account/account/account.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { ValidateComponent } from './validate/validate/validate.component';
import { AuthGuard } from './auth/auth.guard';
import { FriendsListComponent } from './friends-list/friends-list/friends-list.component';
import { AddFriendComponent } from './add-friend/add-friend/add-friend.component';
import { FriendMessagesComponent } from './friend-messages/friend-messages/friend-messages.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'generator', component: GeneratorComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'validate', component: ValidateComponent, canActivate: [AuthGuard] },
  { path: 'friends', component: FriendsListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddFriendComponent, canActivate: [AuthGuard] },
  { path: 'messages/:id', component: FriendMessagesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
