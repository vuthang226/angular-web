import { Component } from '@angular/core';
import { UserService } from '../service/user/user.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";

import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //biến
  datas:any;
  displayedColumns:string[] = ['fullName', 'userName', 'email', 'phoneNumber','isAdmin','action'];
  //phân trang
  pageIndex = 0;
  pageSize = 10;
  totalRecords = 50;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent;
  constructor(private userService: UserService,private dialog:MatDialog,public auth:AuthService,private router:Router) { }
  //check login
  isLogin = this.auth.isAuthenticated();
  userName:any;
  isAdmin:boolean;
  
  ngOnInit(): void {
    this.getByPage();
    this.isAdmin = localStorage.getItem("isAdmin")=="true"?true:false;
    this.userName=this.auth.getUserName()?.toString();
  } 

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
    this.isLogin = false;
  }

  

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalRecords = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getByPage();
  }

  getByPage(){
    this.userService.getByPage(this.pageSize,this.pageIndex+1).subscribe((res:any)=>{
      let tableArr: User[] = res.items;
      this.datas =  new MatTableDataSource(tableArr);
      this.pageSize = res.pageSize;
      this.totalRecords = res.totalRecords;
      this.pageIndex = res.pageIndex-1;
      console.log(res);
    })
  }

  openDialogAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: '',
      isAdd: true
    };
    this.dialog.open(UserDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if(result){
        this.getByPage();
      }
    });
  }

  openDialogUpdate(id:string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: id,
      isAdd: false
    };
    this.dialog.open(UserDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if(result){
        this.getByPage();
      }
    });
  }

  openDialogDelete(id:string,userName:string,isDelete:boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id:id,
      userName: userName,
      isDelete:isDelete
    };
    this.dialog.open(DeleteDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if(result){
        this.getByPage();
      }
    });
  }

}
