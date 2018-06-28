import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';


import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'



@Injectable()
export class WebService {

  web_url: String = "localhost";
  web_port: String = "6367";

  constructor(private http: Http) { }
/*
  getUsers(){
    return this.http.get('http://localhost:6582/api/values')
    .map((res: Response) => {
      return res.json();
    });
  }*/

  isTokenValid(token: any){
    
    const body = token;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://'+this.web_url+':'+this.web_port+'/api/Authentication', body, {
      headers: headers
    })
    .map((data: Response) =>data.json());
  }



  registerUser(user: any){
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://'+this.web_url+':'+this.web_port+'/api/Register', body, {
      headers: headers
    })
    .map((data: Response) =>data.json());
  }

  loginUser(user: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://'+this.web_url+':'+this.web_port+'/api/User_login', body, { headers })
      .map(
        (res: Response) => res.json()
      );
   }

}
