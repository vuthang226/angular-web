import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const apiUrl = 'https://localhost:44359/api/Users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,public http: HttpClient) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(query:object){    
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(apiUrl+'/login'
    , JSON.stringify(query) 
    , {headers:headers, responseType: 'text'}
    ) 
  }

  public register(query:object){    
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(apiUrl
    , JSON.stringify(query) 
    , {headers:headers, responseType: 'text'}
    ) 
  }

  public logout() {
    localStorage.removeItem("token");
  }



}
