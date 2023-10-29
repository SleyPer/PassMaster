import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ChestComponent } from './chest/chest/chest.component';
import { GeneratorComponent } from './generator/generator/generator.component';
import { AccountComponent } from './account/account/account.component';
import { CreateChestComponent } from './create-chest/create-chest/create-chest.component';
import { ChestDetailsComponent } from './chest-details/chest-details/chest-details.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { ValidateComponent } from './validate/validate/validate.component';
import { AuthGuard } from './auth/auth.guard';
import { FriendsComponent } from './friends/friends/friends.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'chest', component: ChestComponent, canActivate: [AuthGuard] },
  { path: 'generator', component: GeneratorComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'chest/:id', component: ChestDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateChestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'validate', component: ValidateComponent, canActivate: [AuthGuard] },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
