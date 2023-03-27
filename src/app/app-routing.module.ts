import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefGuard } from './def.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


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
