import { Injectable } from '@angular/core';
import { WebService } from './web.service';

// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { Router } from '../../../node_modules/@angular/router';

@Injectable()
export class AccountService {


  loginStatus: Boolean = false;

  isUserAccountActivated: Boolean = false;
  USER_ID: String = null;
  USER_EMAIL: String = null;

  public showComposePost: Boolean = false;
  constructor(private webService: WebService, private tokenService: TokenService) {}

  logout() {
    this.loginStatus = false;
    this.isUserAccountActivated = false;
    this.USER_ID = null;
    this.USER_EMAIL = null;
    this.tokenService.clearAllTokens();
  }

 setSessionDetails(object: any) {

  this.isUserAccountActivated = object['account_activated'];
  this.USER_ID = object['user_id'];
  this.USER_EMAIL = object['user_email'];
  console.log('== SET SESSION DETAILS ==');
  console.log('isUserAccountActivated ' + this.isUserAccountActivated);
  console.log('USER_ID ' + this.USER_ID);
  console.log('USER_EMAIL ' + this.USER_EMAIL);
  console.log('======');

 }


  registerUser(Fullname: String, Email: String, Password: String, Gender: String) {
    return this.webService.registerUser({Fullname: Fullname, Email: Email, Password: Password, Sex: Gender});
  }

  loginUser(Email: string, Password: string): Observable<any> {
    return this.webService.loginUser({Email: Email, Password: Password});
  }

  recoverAccount(recoveryEmail: String) {
    const jsonStr = {
      'RECOVERY_EMAIL': recoveryEmail
    };
    return this.webService.recoverAccount(jsonStr);
  }

  recoveryConfirmation(recoveryCode: String, recoveryToken: String, recoveryEmail) {
    const jsonStr = {
      'RECOVERY_CODE': recoveryCode,
      'RECOVERY_TOKEN': recoveryToken,
      'RECOVERY_EMAIL': recoveryEmail
    };

    return this.webService.recoveryConfirmation(jsonStr);

  }

  reset_change_password(RESET_TOKEN: String, RESET_EMAIL: String, NEW_PASSWORD: String) {
    const jsonObj = {
      'RESET_TOKEN': RESET_TOKEN,
      'RESET_EMAIL': RESET_EMAIL,
      'NEW_PASSWORD': NEW_PASSWORD
    };
    return this.webService.reset_change_password(jsonObj);
  }


  sendActivationMail() {
    const jsonStr = {
      'USER_ID': this.USER_ID,
      'USER_EMAIL': this.USER_EMAIL
    };

    // alert(this.USER_ID+"\n"+this.USER_EMAIL);

    return this.webService.sendActivationMail(jsonStr);
  }

  activate_user_account(activationJson: any, ACTIVATION_CODE: String) {

    const ACTIVATION_TOKEN = activationJson.ACTIVATION_TOKEN;

    const jsonStr = {
      'USER_ID': this.USER_ID,
      'ACTIVATION_CODE': ACTIVATION_CODE,
      'ACTIVATION_TOKEN': ACTIVATION_TOKEN
    };

    console.log(JSON.stringify(jsonStr));

    return this.webService.activate_user_account(jsonStr);
  }

  activate_user_account_with_link(iUserID: String, iActivationCode: String, iActivationToken: String) {
    const jsonStr = {
      'USER_ID': iUserID,
      'ACTIVATION_CODE': iActivationCode,
      'ACTIVATION_TOKEN': iActivationToken
    };
    console.log(JSON.stringify(jsonStr));
    return this.webService.activate_user_account(jsonStr);
  }


}
