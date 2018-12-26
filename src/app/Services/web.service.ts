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
  //baseURL: String = 'https://checkarr-api.azurewebsites.net/api/';


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


  getUserFans(id: String, token: String){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token) //Fan/51/fan/find
    return this.http.get(this.baseURL + 'Fan/' + id + '/fan/find', {
      headers: headers
    });
  }

  becomeFan(id: String, targetID: String, token: String){
    const body = {"FanID":targetID};
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + token)
    return this.http.post(this.baseURL + 'Fan/'+id+'/fan/add', body, {
      headers: headers
    });
  }

  getUserProfileDetails(id: String, token: String){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token) //Fan/51/fan/find
    return this.http.get(this.baseURL + 'Accounts/' + id + '/Profile_details', {
      headers: headers
    });
  }


  activate_user_account(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'accounts/activation', body, {
      headers: headers
    });
  }

  sendActivationMail(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'accounts/mail/activation', body, {
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
    return this.http.post(this.baseURL + 'auth/token/access/validate', body, {
      headers: headers
    });
  }

  refreshAccessToken(jsonStr: any) {
    const body = jsonStr;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'auth/token/access/refresh', body, {
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

   upload_dp(input_data: any, userID:any, token:any): Observable<any> {
    console.log('uploading picture');
    const body = input_data;
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token)
    return this.http.post(this.baseURL + 'photos/' + userID + '/dp/add', body, {
      headers: headers
    });
   }

   // ========================

}
