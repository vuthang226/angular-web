import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import {MatDialogModule,MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { UserDialogComponent } from './component/user-dialog/user-dialog.component';

import { JwtHelperService , JWT_OPTIONS} from '@auth0/angular-jwt';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule
    
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },{
    provide: MatDialogRef,
    useValue: {}
  },{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents:[UserDialogComponent,ConfirmDialogComponent]
})
export class AppModule { }
