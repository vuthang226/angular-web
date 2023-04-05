import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const apiUrl = 'https://localhost:44359/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api:string;
  
  constructor() {
    console.log("api contructer");
  }
  getApi():string{
    let culture = localStorage.getItem('culture')==undefined?"vi-VN":"en-US";
    console.log(culture);
    return apiUrl + culture + "/api/Users"
  }
  getHeader():HttpHeaders{
    return new HttpHeaders({'Content-Type':'Application/json','Authorization': `Bearer ${localStorage.getItem('token')}`});
  }

}