import { Injectable } from '@angular/core';
import { WebService } from './web.service';

// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { Router } from '../../../node_modules/@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AccountService {


  loginStatus: Boolean = false;

  isUserAccountActivated: Boolean = false;
  USER_ID: String = null;
  USER_EMAIL: String = null;

  dp_url: string = "";

  public showComposePost: Boolean = false;


  isTokenValidationComplete: Boolean = true;
  networkProblem: Boolean = false;

  jwtHelper = new JwtHelperService();

  constructor(private webService: WebService, private tokenService: TokenService, private router: Router) {}

  isTokenExpired() {
    console.log('isTokenExpire method start');
    const localStorageObj = localStorage.getItem('currentUser');
    console.log('test');
    var expiry = true;

    if (localStorageObj != null) {
      console.log('test');
      const currentUser = JSON.parse(localStorageObj);
      const access_token = currentUser.AccessToken;
      console.log('test');
      try {
        expiry = this.jwtHelper.isTokenExpired(access_token);
      } catch {
        expiry = true;
      }
      console.log(expiry);
      console.log('test');
    }
    console.log('isTokenExpire method finish');
    return expiry;
  }


  refreshAccessToken(componentName: String) {
    const localStorageObjForRefreshToken = localStorage.getItem('currentUserRefreshInfo');


    if (localStorageObjForRefreshToken == null) {
      // no refresh details present in browser
      this.isTokenValidationComplete = true;
      this.tokenService.clearAllTokens();
      if (componentName == 'RegisterComponent') {
      } else if (componentName == 'StartComponent' ) {
      } else {
        this.router.navigate(['/welcome']);
      }
      return;
    }

    const currentUserRefreshInfo = JSON.parse(localStorageObjForRefreshToken);
    const REFRESH_TOKEN = currentUserRefreshInfo.RefreshToken;
    const user_id = currentUserRefreshInfo.user_id;


    var expiry = true;

    try {
      expiry = this.jwtHelper.isTokenExpired(REFRESH_TOKEN);
    } catch {
      expiry = true;
    }

    if (expiry) {
        this.tokenService.clearAllTokens();
        if (componentName == 'RegisterComponent') {
        } else if (componentName == 'StartComponent' ) {
        } else {
         this.router.navigate(['/welcome']);
        }
        this.loginStatus = false;
        this.isTokenValidationComplete = true;
        return;
    }

    const jsonObj = {
      'refresh_token': REFRESH_TOKEN,
      'user_id': user_id
    };

    this.tokenService.refreshAccessToken(jsonObj)
    .subscribe(
      data => {
        // new access token
        const new_refresh_token = data.new_refresh_token;
        const new_access_token = data.new_access_token;

        console.log('NEW REFRESH TOKEN: ' + new_refresh_token);
        console.log('NEW ACCESS TOKEN: ' + new_access_token);

        const user_id = data.user_id;

        this.tokenService.setRefreshToken(new_refresh_token, user_id);
        this.tokenService.setAccessToken(new_access_token, user_id);

        this.isTokenValidationComplete = true;
        this.networkProblem = false;

        this.setSessionDetails(data);

        if (componentName == 'StartComponent' || componentName == 'RegisterComponent') {
          this.router.navigate(['']);
        }

        console.log(' GOT NEW REFRESH TOKEN AND ACCESS TOKEN');

      },
      error => {
        if (error == 'false' || error == 'Server encountered some problem') {
          // refresh token is not valid
          this.tokenService.clearAllTokens();

          if (componentName == 'RegisterComponent') {
          } else if (componentName == 'StartComponent' ) {
          } else {
            this.router.navigate(['/welcome']);
          }
          this.loginStatus = false;
        } else {
          this.networkProblem = true;
        }
        this.isTokenValidationComplete = true;
      },
      () => {

      }
    );
  }

  authorize (componentName: String) {

    console.log("authourize");

    this.isTokenValidationComplete = false;

    if (this.isTokenExpired()) {
      console.log('ACCESS TOKEN IS EXPIRED AUTH0');
      this.refreshAccessToken(componentName);
      return;
    }

    const localStorageObj = localStorage.getItem('currentUser');
    if (localStorageObj == null) {
      // no user details present in browser
      this.isTokenValidationComplete = true;
      if (componentName == 'RegisterComponent') {
      } else if (componentName == 'StartComponent' ) {
      } else {
        this.router.navigate(['/welcome']);
      }
      this.refreshAccessToken(componentName);
      return;
    }

    const currentUser = JSON.parse(localStorageObj);
    const token = currentUser.AccessToken;
    const user_id = currentUser.user_id;
    // console.log(token);
    const jsonStr = {
      'AccessToken': token,
      'user_id': user_id
    };
    this.tokenService.verifyAccessToken(jsonStr)
    .subscribe(
      data => {

        const isAccessTokenValid = data.access_validation;
        console.log(data.user_id);
        console.log('TOKEN SERVICE => isValid: ' + isAccessTokenValid);
        // Access token valid
        this.loginStatus = true;
        this.isTokenValidationComplete = true;
        this.networkProblem = false;
        this.setSessionDetails(data);

        if (componentName == 'StartComponent' || componentName == 'RegisterComponent') {
          this.router.navigate(['']);
        }
        console.log('Access token is valid');

      }, error => {
        // console.log('Error while validating token');
        // console.error(error);
        if (error == 'false' || error == 'Server encountered some problem') {
          // access token not valid
          // console.error('Access token is not valid');
          console.log('Access token is not valid, sending refresh token');
          this.refreshAccessToken(componentName);

        } else if (error == 'Unauthorized') {
          // token is valid but stored email is not valid
          this.tokenService.clearAllTokens();
          if (componentName == 'RegisterComponent') {
          } else if (componentName == 'StartComponent' ) {
          } else {
            this.router.navigate(['/welcome']);
          }
          this.loginStatus = false;
          this.isTokenValidationComplete = true;
        } else {
          // some network error
          // console.log('network problem');
          this.networkProblem = true;
          this.isTokenValidationComplete = true;
        }
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    ); // END VERIFY ACCESS TOKEN
  }


  logout() {
    this.loginStatus = false;
    this.USER_ID = null;
    this.USER_EMAIL = null;
    this.tokenService.clearAllTokens();
    this.isUserAccountActivated = false;
    this.dp_url = "";
  }

 setSessionDetails(object: any) {

  this.isUserAccountActivated = object.account_activated;
  this.USER_ID = object.user_id;
  this.USER_EMAIL = object.user_email;
  this.dp_url = object.dp_url;
  console.log('== SET SESSION DETAILS ==');
  console.log('isUserAccountActivated ' + this.isUserAccountActivated);
  console.log('USER_ID ' + this.USER_ID);
  console.log('USER_EMAIL ' + this.USER_EMAIL);
  console.log('DP_URL ' + this.dp_url);
  console.log('======');

 }


  registerUser(Fullname: String, Email: String, Password: String, Gender: String) {
    return this.webService.registerUser({Fullname: Fullname, Email: Email, Password: Password, Sex: Gender});
  }

  loginUser(Email: string, Password: string): Observable<any> {
    return this.webService.loginUser({Email: Email, Password: Password});
  }

  recoverAccount(recoveryEmail: String): Observable<any> {
    const jsonStr = {
      'RECOVERY_EMAIL': recoveryEmail
    };
    return this.webService.recoverAccount(jsonStr);
  }

  recoveryConfirmation(recoveryCode: String, recoveryToken: String, recoveryEmail): Observable<any> {
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


  sendActivationMail(): Observable<any> {
    const jsonStr = {
      'USER_ID': this.USER_ID,
      'USER_EMAIL': this.USER_EMAIL
    };

    // alert(this.USER_ID+"\n"+this.USER_EMAIL);

    return this.webService.sendActivationMail(jsonStr);
  }

  activate_user_account(activationJson: any, ACTIVATION_CODE: String): Observable<any> {

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
