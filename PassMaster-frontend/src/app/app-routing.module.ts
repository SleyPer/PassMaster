import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ChestComponent } from './chest/chest/chest.component';
import { GeneratorComponent } from './generator/generator/generator.component';
import { AccountComponent } from './account/account/account.component';
import { ChestFormComponent } from './chest-form/chest-form/chest-form.component';
import { CreateChestComponent } from './create-chest/create-chest/create-chest.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'chest', component: ChestComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: 'account', component: AccountComponent },
  { path: 'chest/:id', component: ChestFormComponent },
  { path: 'create', component: CreateChestComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
