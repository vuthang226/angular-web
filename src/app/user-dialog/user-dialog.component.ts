import { Component,Inject,OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup,FormBuilder,FormControl,Validators }   from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  form: FormGroup= new FormGroup({
    id: new FormControl(''),
    fullName: new FormControl(''),
    phoneNumber : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    confirmPassword : new FormControl(''),
    userName : new FormControl(''),
  });;
  isAdd: boolean;
  id: string;
  dialogName:string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private notificationService:NotificationService,
    @Inject(MAT_DIALOG_DATA) data:any) {
    this.isAdd = data.isAdd;
    this.dialogName = data.isAdd ?'Thêm mới':'Cập nhật'
    this.id = data.id;
  }
  ngOnInit() {
    if(this.isAdd){
      this.form = new FormGroup({
        id: new FormControl(''),
        fullName: new FormControl('',Validators.required),
        phoneNumber : new FormControl('',Validators.required),
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',Validators.required),
        confirmPassword : new FormControl('',Validators.required),
        userName : new FormControl('',Validators.required),
      });
    }else{
      this.userService.getById(this.id).subscribe(res => {
        if(res.success){
          this.form = new FormGroup({
            id: new FormControl(res.data.id),
            fullName: new FormControl(res.data.fullName,Validators.required),
            phoneNumber : new FormControl(res.data.phoneNumber,Validators.required),
            email : new FormControl(res.data.email,[Validators.required,Validators.email]),
            userName : new FormControl(res.data.userName,Validators.required),
          });
          
        }else{
          this.notificationService.warn(res.message);
        }
      },    
      error => {
        this.notificationService.warn('Có lỗi xảy ra');
      });
    }
  }

  save() {
    if(this.form.valid){
      console.log(this.form.value);
      if(this.isAdd){
        this.userService.insert(this.form.value).subscribe(res => {
          if(res.success){
            this.dialogRef.close(true);
            this.notificationService.success(res.message);
          }else{
            this.notificationService.warn(res.message);
          }
        },
        error => {
          
          this.notificationService.warn('Có lỗi xảy ra');
        });
      }else{
        this.userService.update(this.form.value.id,this.form.value).subscribe(res => {
          if(res.success){
            this.dialogRef.close(true);
            this.notificationService.success(res.message);        
          }else{
            this.notificationService.warn(res.message);
          }
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          this.notificationService.warn('Có lỗi xảy ra');
        });
      }
    
    }else this.notificationService.warn('Dữ liệu không hợp lệ');
    
    
  }

  close() {
    this.dialogRef.close(false);
  }
}
