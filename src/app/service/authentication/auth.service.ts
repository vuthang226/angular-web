import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api/api.service';
//const apiUrl = 'https://localhost:44359/api/Users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,public http: HttpClient,public apiService:ApiService) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(query:object){    
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(this.apiService.getApi()+'/login'
    , JSON.stringify(query) 
    , {headers:headers, responseType: 'text'}
    ) 
  }

  public getUserName(){
    return localStorage.getItem('userName');
  }

  public register(query:object){    
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(this.apiService.getApi()
    , JSON.stringify(query) 
    , {headers:headers, responseType: 'text'}
    ) 
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
  }



}
