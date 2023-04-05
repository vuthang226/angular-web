import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authentication/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public errorMsg:string = '';
  constructor(private auth:AuthService,private router:Router,private translateService: TranslateService){}
  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');

  }
  onSubmit(f: NgForm) {
    const data:object = {userName:f.value.userName,password:f.value.password,rememberMe:true};
    if(f.form.valid){
    this.auth.login(data).subscribe(res => {
      console.log(res);
      var d = JSON.parse(res);
      if(d.success){
        
        localStorage.setItem('token', d.data.jwtToken);
        localStorage.setItem('userName', d.data.userVm.userName);
        localStorage.setItem('role', d.data.userVm.role);
        this.router.navigateByUrl('/');
      }else{
        this.errorMsg = d.message;
      }
    },
    error => {
      this.errorMsg = this.translateService.instant('LOGIN.loginFailure');
    }

    );
  }
  }

  setLanguage(lang:string){
    this.errorMsg = '';
    if(lang=="vi"){
      localStorage.setItem("culture","vi-VN");
    }else{
      localStorage.setItem("culture","en-US");
    }
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }
  

}
