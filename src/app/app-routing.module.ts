import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefGuard } from './service/guard/def.guard';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';


const routes: Routes = [
  //
  { path:'', component:HomeComponent,canActivate:[DefGuard]},
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
