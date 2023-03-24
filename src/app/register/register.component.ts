import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMsg:string = '';
  constructor(private auth:AuthService,private router:Router){}
  register(f: NgForm) {
    console.log(f)
    const data:object = {
      userName:f.value.userName,
      password:f.value.password,
      fullName:f.value.fullName,
      confirmPassword:f.value.confirmPassword,
      email:f.value.email,
      phoneNumber:f.value.phoneNumber
    };
    this.auth.register(data).subscribe(res => {
      console.log(res);
      var d = JSON.parse(res);
      if(d.success){
        
        this.router.navigateByUrl('/login');
      }else{
        this.errorMsg = d.message;
      }
      

    },
    error => {
      this.errorMsg = "Đăng nhập không thành công"
      console.log('oops', error);
      //this.router.navigateByUrl('/login');
    });
  }
}
