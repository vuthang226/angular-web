import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {User} from '../../models/user.model';
import { ApiService } from '../api/api.service';


//const apiUrl = 'https://localhost:44359/api/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient,private apiService:ApiService) { }
	
	getByPage(pageSize:Number,pageIndex:Number):Observable<any>{
	  return this.httpClient.get<any>(this.apiService.getApi()+'/page?pageSize='+pageSize+'&pageIndex='+pageIndex,{headers:this.apiService.getHeader()}).pipe();
	}

	getById(resource:string):Observable<any>{
		return this.httpClient.get<any>(this.apiService.getApi()+'/'+resource,{headers:this.apiService.getHeader()}).pipe();
	}

	update(resource:string,data:object):Observable<any>{
		return this.httpClient.put<any>(this.apiService.getApi()+'/'+resource,data,{headers:this.apiService.getHeader()}).pipe();
	}

	insert(data:object):Observable<any>{
		return this.httpClient.post<any>(this.apiService.getApi(),data).pipe();
	}

	delete(resource:string):Observable<any>{
		return this.httpClient.delete<any>(this.apiService.getApi()+'/'+resource,{headers:this.apiService.getHeader()}).pipe();
	}

	assign(data:Object):Observable<any>{
		return this.httpClient.post<any>(this.apiService.getApi()+'/assign',data,{headers:this.apiService.getHeader()}).pipe();
	}


}