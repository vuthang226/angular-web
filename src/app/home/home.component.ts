import { Component } from '@angular/core';
import { UserService } from '../service/user/user.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  datas:any[]=[];
  pageIndex:Number = 1;
  pageSize:Number = 10;
  

  constructor(private userService: UserService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getByPage();
  } 

  getByPage(){
    this.userService.getByPage(this.pageSize,this.pageIndex).subscribe((res:any)=>{
      this.datas = res.items;
      console.log(res);
    })
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    this.dialog.open(UserDialogComponent, dialogConfig);
  }

}
