import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import { NotificationService } from '../../service/notification.service';

import { UserDialogComponent } from '../../component/user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../../component/confirm-dialog/confirm-dialog.component';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authentication/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //biến
  datas:any;
  displayedColumns:string[] = ['fullName', 'userName', 'email', 'phoneNumber','role','action'];
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
  constructor(private userService: UserService,
    private dialog:MatDialog,
    public auth:AuthService,
    private router:Router,
    private notificationService:NotificationService) { }
  //check login
  isLogin = this.auth.isAuthenticated();
  userName:any;
  role:any;
  roles:string[]=["admin","reader","writer"];
  
  
  ngOnInit(): void {
    this.getByPage();
    this.role = localStorage.getItem("role")==undefined?"reader":localStorage.getItem("role")?.toString();
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
      isAdd: true,
      role: this.role,
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
      isAdd: false,
      role: this.role,
    };
    this.dialog.open(UserDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if(result){
        this.getByPage();
      }
    });
  }

  openDialogDelete(id:string,userName:string) {
    if(this.role == "admin"){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        content:"Bạn chắc chắc muốn xóa tài khoản "+ userName
      };
      this.dialog.open(ConfirmDialogComponent, dialogConfig).afterClosed().subscribe((result:Boolean) => {
        if(result){
          this.userService.delete(id).subscribe(res => {
            if(res.success){
              this.notificationService.success(res.message);
            }else{
              this.notificationService.warn(res.message);
            }
            this.getByPage();
          },
          error => {
            this.notificationService.warn('Có lỗi xảy ra');
            this.getByPage();
          });
        }
      });
    }else{
      this.notificationService.warn('Bạn không được phép xóa tài khoản')
    }

  }

  selectRole(role:string,data:any){
    if(this.role == "admin"){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        content:"Bạn có chắc muốn gán quyền "+role +" cho tài khoản "+data.userName
      };
      this.dialog.open(ConfirmDialogComponent, dialogConfig).afterClosed().subscribe((result:Boolean) => {
        if(result){
          this.userService.assign({userId:data.id,roleName:role}).subscribe(res => {
            if(res.success){
              this.notificationService.success(res.message);
            }else{
              this.notificationService.warn(res.message);
            }
            this.getByPage();
          },
          error => {
            this.notificationService.warn('Có lỗi xảy ra')
            this.getByPage();;
          });
        }
        
      });
    }else{
      this.notificationService.warn('Bạn không được phép gán quyền')
    }
    
  }

}
