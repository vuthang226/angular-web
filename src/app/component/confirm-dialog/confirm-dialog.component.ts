import { Component,Inject } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  content:string;
  
  constructor(private userService: UserService,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any){
    this.content = data.content;
  }

  close() {
    this.dialogRef.close(false);
  }

  confirm(){
    this.dialogRef.close(true);
   
  }
}


