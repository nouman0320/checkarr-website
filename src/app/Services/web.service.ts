import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';


import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'



@Injectable()
export class WebService {

  // this is web service....
  
  web_url: String = "localhost";
  web_port: String = "6367";// always change this with port of your api server

  constructor(private http: Http) { }
/*
  getUsers(){
    return this.http.get('http://localhost:6582/api/values')
    .map((res: Response) => {
      return res.json();
    });
  }*/


  recoverAccount(jsonStr: any){
    const body = jsonStr;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://'+this.web_url+':'+this.web_port+'/api/Confirmation/Account_recovery', body, {
      headers: headers
    })
    .map((data: Response) =>data.json());
  }

  recoveryConfirmation(jsonStr: any){
    const body = jsonStr;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://'+this.web_url+':'+this.web_port+'/api/Confirmation/Recovery_confirmation', body, {
      headers: headers
    })
    .map((data: Response) =>data.json());
  }

  reset_change_password(jsonStr: any){
    const body = jsonStr;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://'+this.web_url+':'+this.web_port+'/api/Confirmation/Reset_change_password', body, {
      headers: headers
    })
    .map((data: Response) =>data.json());
  }

  verifyResetToken(jsonStr: any){
    const body = jsonStr;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://'+this.web_url+':'+this.web_port+'/api/Confirmation/Verify_reset_token', body, {
      headers: headers
    })
    .map((data: Response) =>data.json());
  }

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
