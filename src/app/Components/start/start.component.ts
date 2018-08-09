import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { TokenService } from '../../Services/token.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';



// declare var jQuery:any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  loginError: Boolean = false;
  connectionError: Boolean = false;
  userNotFoundError: Boolean = false;
  loginTry: Boolean = false;

  pageLoading: Boolean = true;
  noInternet: Boolean = false;

  recoveryEmailErrorMessage: String = 'Something went wrong';
  recoveryCodeErrorMessage: String = 'Something went wrong';
  currentRecoveryEmail: String = '';

  recoveryEmailError: Boolean = false;
  recoveryCodeError: Boolean = false;

  modalProgressBar: Boolean = false;

  constructor(public router: Router, private modalService: NgbModal,
    public accountService: AccountService, public tokenService: TokenService) { }

  ngOnInit() {
    this.pageLoading = false; // remove
    /*
    var localStorageObj = localStorage.getItem('currentUser');
    if(localStorageObj == null){
      // no user details present in browser
      // means user not logged in
      this.pageLoading = false;
      return;
    }

    var currentUser = JSON.parse(localStorageObj);
    var token = currentUser.AccessToken;
    var email = currentUser.Email;
    var isAccessTokenValid = false;
    console.log(token);
    var jsonStr = {
      "AccessToken": token,
      "Email": email
    }
    this.tokenService.verifyAccessToken(jsonStr)
    .subscribe(
      data => {
        isAccessTokenValid = data["AccessValidation"];
        console.log("TOKEN SERVICE => isValid: "+isAccessTokenValid);
        // success connection

        if(!isAccessTokenValid){
          // access token is not valid now we will send refresh token
          console.log("=> Access token is not valid sending refresh token... ");
          this.pageLoading = false;
          //this.router.navigate(["/welcome"]);
        }
        else{
          // access token is valid
          this.router.navigate([""]);
        }
      }, error => {
        console.log("Error while validating token");
        this.noInternet = true;
        // error
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    ); // END VERIFY ACCESS TOKEN

    //this.tokenService.clearAllTokens();
    */
  }

  onLoginTry(loginForm: NgForm) {
    this.loginTry = true;
    this.connectionError = false;
    this.loginError = false;
    this.userNotFoundError = false;

    this.accountService.loginUser(loginForm.value.email, loginForm.value.password)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        if (data['ok'] == 1 && data['issued'] == true) { // login sucess
          // alert("Login Successful");
          if (data['activation_status'] == 'T') {
            this.accountService.isUserAccountActivated = true;
          } else {
            this.accountService.isUserAccountActivated = false;
          }

          this.accountService.USER_EMAIL = data['user_email'];
          // alert(this.accountService.USER_EMAIL);
          this.accountService.USER_ID = data['user_id'];
          this.tokenService.setAccessToken(data['token'], loginForm.value.email);
          this.tokenService.setRefreshToken(data['refresh_token'], loginForm.value.email);

          this.router.navigate(['']);
        } else if (data['ok'] == 2) { // incorrect password
          this.loginError = true;
        } else if (data['ok'] == 3) { // account not found
          this.userNotFoundError = true;
          console.log('not found');
        }
      }, error => {
        console.log('Unable to connect to the server');
        this.connectionError = true;
        this.loginTry = false;
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.connectionError = false;
        this.loginTry = false;
      }
    );
  }

  onClickRegister() {
    this.router.navigate(['/register']);
  }

  private recoveryEmailModal: NgbModalRef;
  onHelpButtonClick(content) {
    this.recoveryEmailError = false;
    this.recoveryEmailErrorMessage = 'Something went wrong';
    this.recoveryEmailModal = this.modalService.open(content, { centered: true });
    this.modalProgressBar = false;
  }

  private RECOVERY_TOKEN: String;
  private RECOVERY_EMAIL: String;
  private recoveryCodeModal: NgbModalRef;
  sendRecoveryMail(recoveryMail: String, nextModal) {

    this.currentRecoveryEmail = recoveryMail;
    this.modalProgressBar = true;

    this.accountService.recoverAccount(recoveryMail)
    .subscribe(
      data => {
        // alert(data["RETURN_CODE"]+"\n"+data["RECOVERY_TOKEN"])

        if (data['RETURN_CODE'] == 1) {
          // mail is sent
          this.recoveryCodeError = false;
          this.recoveryCodeErrorMessage = 'Something went wrong';

          this.RECOVERY_TOKEN = data['RECOVERY_TOKEN'];
          this.RECOVERY_EMAIL = recoveryMail;
          // console.log(this.RECOVERY_TOKEN);
          this.modalProgressBar = false;

          this.recoveryEmailModal.close();
          this.recoveryCodeModal = this.modalService.open(nextModal, {centered: true});
        } else if (data['RETURN_CODE'] == 2) {
          // mail is not sent
          this.recoveryEmailError = true;
          this.recoveryEmailErrorMessage = 'This email is not associated with any account';
          this.modalProgressBar = false;
        } else if (data['RETURN_CODE'] == 3) {
          // exception in API
          this.recoveryEmailError = true;
          this.recoveryEmailErrorMessage = 'Server ran into some unexpected error';
          this.modalProgressBar = false;
        }
      }, error => {
        this.recoveryEmailError = true;
          this.recoveryEmailErrorMessage = 'Unable to connect to the services';
          this.modalProgressBar = false;
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );

  }

  private RESET_TOKEN: String;
  verifyRecoveryCode(recoveryCode: String) {
    // this.recoveryCodeModal.close();
    this.modalProgressBar = true;
    this.accountService.recoveryConfirmation(recoveryCode, this.RECOVERY_TOKEN, this.RECOVERY_EMAIL)
    .subscribe(
      data => {
        // alert(data["RETURN_CODE"] +"\n"+data["RESET_TOKEN"]);
        const retCode = data['RETURN_CODE'];
        const resetToken = data['RESET_TOKEN'];

        if (retCode == 1) {
          // recovery code is confirmed
          this.recoveryCodeError = false;
          this.RESET_TOKEN = resetToken;
          this.tokenService.setResetToken(this.RESET_TOKEN, this.RECOVERY_EMAIL);
          this.router.navigate(['/password-change']);
          this.recoveryCodeModal.close();
        } else if (retCode == 2) {
          // recovery code is invalid
          this.recoveryCodeErrorMessage = 'Provided code is either expired or not valid';
          this.recoveryCodeError = true;
        } else if (retCode == 3) {
          // recovery token is invalid
          this.recoveryCodeErrorMessage = 'Please re-do the recovery process';
          this.recoveryCodeError = true;
        } else if (retCode == 4) {
          // exception in api
          this.recoveryCodeErrorMessage = 'Internal server error';
          this.recoveryCodeError = true;
        } else if (retCode == 5) {
          // internal error
          this.recoveryCodeErrorMessage = 'Internal server error while processing your request';
          this.recoveryCodeError = true;
        } else {
          // unknown
          this.recoveryCodeErrorMessage = 'Unknown error has occured';
          this.recoveryCodeError = true;
        }

      }, error => {
        this.recoveryCodeErrorMessage = 'There is something wrong with the connection';
        this.recoveryCodeError = true;
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.modalProgressBar = false;
      }
    );
  }
}
