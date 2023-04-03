import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authentication/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup,FormControl,Validators }   from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  errorMsg:string = '';
  form:FormGroup;
  constructor(private auth:AuthService,private router:Router){}
  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.form = new FormGroup({
      fullName: new FormControl('',Validators.required),
      phoneNumber : new FormControl('',Validators.required),
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',Validators.required),
      confirmPassword : new FormControl('',Validators.required),
      userName : new FormControl('',Validators.required),
    });
  }
        
  register() {
    if(this.form.valid){
      this.auth.register(this.form.value).subscribe(res => {
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

      });
    
   
    }
  }


}
