import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';


// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpResponse, HttpHeaders } from '../../../node_modules/@angular/common/http';



@Injectable()
export class WebService {

  // this is web service....
  baseURL: String = 'https://localhost:5000/api/';


  web_url: String = 'localhost';
  web_port: String = '6367'; // always change this with port of your api server

  constructor(private http: HttpClient) { }
/*
  getUsers(){
    return this.http.get('http://localhost:6582/api/values')
    .map((res: Response) => {
      return res.json();
    });
  }*/



  activate_user_account(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.web_url + ':' + this.web_port + '/api/Home/activate_user_account', body, {
      headers: headers
    });
  }

  sendActivationMail(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.web_url + ':' + this.web_port + '/api/Home/send_activation_mail', body, {
      headers: headers
    });
  }


  recoverAccount(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'accounts/recover', body, {
      headers: headers
    });
  }

  recoveryConfirmation(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'accounts/recover/confirm', body, {
      headers: headers
    });
  }

  reset_change_password(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'accounts/recover/reset/password', body, {
      headers: headers
    });
  }

  verifyResetToken(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'accounts/recover/reset/confirm', body, {
      headers: headers
    });
  }

  isTokenValid(token: any) {
    const body = token;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.web_url + ':' + this.web_port + '/api/Authentication/validate_access_token', body, {
      headers: headers
    });
  }

  refreshAccessToken(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.web_url + ':' + this.web_port + '/api/Authentication/refresh_access_token', body, {
      headers: headers
    });
  }

  registerUser(user: any) {
    const body = JSON.stringify(user);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'auth/register', body, {
      headers: headers
    });
  }

  loginUser(user: any): Observable<any> {
    const body = JSON.stringify(user);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'auth/login', body, { headers });
   }

   // media related following

   upload_dp(input_data: any) {
    console.log('uploading picture');
    const body = input_data;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'multi-part/form-data');
    return this.http.post('http://' + this.web_url + ':' + this.web_port + '/api/Home/update_dp', body, {
      headers: headers
    });
   }

   // ========================

}
