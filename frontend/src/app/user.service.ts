import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee}from './shared/employee.model';
@Injectable()
export class UserService {
  selectedEmployee: Employee;
  employees: Employee[];
  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://127.0.0.1:3000/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  update(body:any){
    console.log(body);
    return this._http.post('http://127.0.0.1:3000/users/update',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  user(){
    return this._http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  
  mail(body:any){
    console.log("inside services")
    return this._http.post('http://127.0.0.1:3000/users/sendMail',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })

  }


  postEmployee(emp: Employee) {
    console.log('hello')
    return this._http.post('http://127.0.0.1:3000/users', emp);
  }

  getEmployeeList() {
    console.log('hello')
    return this._http.get('http://127.0.0.1:3000/users');
  }

  putEmployee(emp: Employee) {
    return this._http.put('http://127.0.0.1:3000/users' + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this._http.delete('http://127.0.0.1:3000/users' + `/${_id}`);
  }
  




}
