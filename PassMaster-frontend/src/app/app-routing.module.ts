import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { FriendMessagesComponent } from './components/friend-messages/friend-messages.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ValidateComponent } from './components/validate/validate.component';
import { AuthGuard } from './guards/auth.guard';
import { GroupMessageComponent } from './components/group-message/group-message.component';


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
  { path: 'reset/password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'group-message', component: GroupMessageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
