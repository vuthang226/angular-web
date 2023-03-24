import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {User} from '../../models/user.model';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'https://localhost:44359/api/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  // getAl(resource:Object):Observable<User[]>{
  //   return this.httpClient.get<User[]>(apiUrl,resource).pipe(
  //   )
  // }
	getByPage(pageSize:Number,pageIndex:Number):Observable<any>{
	  return this.httpClient.get<any>(apiUrl+'/page?pageSize='+pageSize+'&pageIndex='+pageIndex).pipe();
	}

	getById(resource:string):Observable<any>{
		return this.httpClient.get<any>(apiUrl+'/'+resource).pipe();
	}

	update(resource:string,data:object):Observable<any>{
		return this.httpClient.put<any>(apiUrl+'/'+resource,data).pipe();
	}

	delete(resource:string):Observable<any>{
		return this.httpClient.delete<any>(apiUrl+'/'+resource).pipe();
	}


}