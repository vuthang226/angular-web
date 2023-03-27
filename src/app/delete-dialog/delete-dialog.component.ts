import { Component,Inject } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { NotificationService } from '../service/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  name:string;
  id:string;
  isDelete:boolean;
  constructor(private userService: UserService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private notificationService:NotificationService,
    @Inject(MAT_DIALOG_DATA) data:any){
    this.name = data.isDelete?'Bạn chắc chắc muốn xóa tài khoản '+ data.userName+' ?':'Bạn có chắc muốn gán quyền cho tài khoản '+data.userName+' ?';
    this.id = data.id;
    this.isDelete = data.isDelete;
  }

  close() {
    this.dialogRef.close(false);
  }

  confirm(){
    if(this.isDelete){
      this.userService.delete(this.id).subscribe(res => {
        if(res.success){
          this.dialogRef.close(true);
          this.notificationService.success(res.message);
        }else{
          this.dialogRef.close(true);
          this.notificationService.warn(res.message);
        }
      },
      error => {
        this.dialogRef.close(true);
        this.notificationService.warn('Có lỗi xảy ra');
      });
    }else{
      this.userService.assign({id:this.id}).subscribe(res => {
        if(res.success){
          this.dialogRef.close(true);
          this.notificationService.success(res.message);
        }else{
          this.dialogRef.close(true);
          this.notificationService.warn(res.message);
        }
      },
      error => {
        this.dialogRef.close(true);
        this.notificationService.warn('Có lỗi xảy ra');
      });
    }
    
  }
}


