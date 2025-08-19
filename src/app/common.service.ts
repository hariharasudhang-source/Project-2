import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  onLogin(data :any):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,data);
  }

  getEmployee():Observable<any>{
    return this.http.get(`${this.baseUrl}/employees`);
  }

  editEmployee(id:any,data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/employees/${id}`,data);
  }

  deleteEmployee(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }

  addEmployee( data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/employees`,data);
  }
}