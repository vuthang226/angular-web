import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public errorMsg:string = '';
  constructor(private auth:AuthService,private router:Router){}
  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }
  onSubmit(f: NgForm) {
    const data:object = {userName:f.value.userName,password:f.value.password,rememberMe:true};
    this.auth.login(data).subscribe(res => {
      console.log(res);
      var d = JSON.parse(res);
      if(d.success){
        
        localStorage.setItem('token', d.data.jwtToken);
        localStorage.setItem('userName', d.data.user.userName);
        this.router.navigateByUrl('/');
      }else{
        this.errorMsg = d.message;
      }
      

    },
    error => {
      this.errorMsg = "Đăng nhập không thành công"
      console.log('oops', error);
      //this.router.navigateByUrl('/login');
    }

    );
  }
  

}
