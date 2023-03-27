import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule,MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

import { JwtHelperService , JWT_OPTIONS} from '@auth0/angular-jwt';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatPaginatorModule
    
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },{
    provide: MatDialogRef,
    useValue: {}
  },{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents:[UserDialogComponent,DeleteDialogComponent]
})
export class AppModule { }
