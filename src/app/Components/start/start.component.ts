import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { TokenService } from '../../Services/token.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../../Services/alertify.service';



// declare var jQuery:any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  loginErrorHtml: any = '';
  loginErrorMessage: String = '';
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

  photo_credit: String = 'Photo by @rawpixel';

  constructor(public router: Router, private modalService: NgbModal,
    public accountService: AccountService, public tokenService: TokenService,
    private alertifyService: AlertifyService) {

      if (this.accountService.loginStatus) {
        // account is logged in
        this.router.navigate(['']);
      }
    }

  ngOnInit() {
    this.pageLoading = false; // remove


  }

  onLoginTry(loginForm: NgForm) {
    this.loginTry = true;
    this.connectionError = false;
    this.loginError = false;
    this.userNotFoundError = false;
    this.loginErrorHtml = '';

    this.accountService.loginUser(loginForm.value.email, loginForm.value.password)
    .subscribe(
      data => {
        const user = data;
        const activation_status = user.activation_status;
        const user_email = user.user_email;
        const access_token = user.token;
        const refresh_token = user.refresh_token;
        const user_id = user.user_id;
        this.alertifyService.success('Welcome');
        this.router.navigate(['']);
        console.log('login success');
        console.log(user_email);
        console.log(access_token);
        console.log(refresh_token);
        console.log(user_id);
        if (activation_status == 'T') {
          this.accountService.isUserAccountActivated = true;
        } else {
          this.accountService.isUserAccountActivated = false;
        }
        this.accountService.USER_EMAIL = user_email;
        this.accountService.USER_ID = user_id;
        this.accountService.dp_url = user.dp_url;
        this.tokenService.setAccessToken(access_token, user_id);
        this.tokenService.setRefreshToken(refresh_token, user_id);
        // this.tokenService.setRefreshToken(data['refresh_token'], loginForm.value.email);
        // this.router.navigate(['']);
      },
      error => {
        if (error == 'Unauthorized') {
          this.loginErrorHtml = '<strong>If you need help then click on assistance above</strong>';
          error = 'Email or password is incorrect';
          this.alertifyService.warning('If you need help then click on assistance above');
        }

        this.alertifyService.error(error);
        // this.loginErrorMessage = error;
        // this.loginError = true;
        // console.error(error);
        // this.connectionError = true;
        this.loginTry = false;
      },
      () => {
        this.connectionError = false;
        this.loginError = false;
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

  closeRecoveryModal() {
    this.recoveryEmailModal.close();
  }

  private recoveryCodeModal: NgbModalRef;

  sendRecoveryMail(recoveryMail: String, nextModal) {
    // FIRST MODAL TO ENTER EMAIL
    this.currentRecoveryEmail = recoveryMail;
    this.modalProgressBar = true;

    this.accountService.recoverAccount(recoveryMail).subscribe(
      data => {
        const response = data;
        const recovery_token = response.recovery_token;
        this.RECOVERY_TOKEN = recovery_token;
        this.RECOVERY_EMAIL = this.currentRecoveryEmail;
        this.recoveryCodeError = false;
        this.modalProgressBar = false;
        this.recoveryEmailModal.close();
        this.recoveryCodeModal = this.modalService.open(nextModal, {centered: true});
      },
      error => {
        this.recoveryEmailError = true;
        this.recoveryEmailErrorMessage = error;
        this.modalProgressBar = false;
      },
      () => {
        this.modalProgressBar = false;
      }
    );
  }



  closeRecoveryCodeModal() {
    this.recoveryCodeModal.close();
  }

  private RESET_TOKEN: String;

  verifyRecoveryCode(recoveryCode: String) {
    this.modalProgressBar = true;
    console.log(this.RECOVERY_TOKEN);
    this.accountService.recoveryConfirmation(recoveryCode, this.RECOVERY_TOKEN, this.RECOVERY_EMAIL)
    .subscribe(
      data => {
        this.modalProgressBar = false;
        const reset_token = data.reset_token;
        this.RESET_TOKEN = reset_token;
        this.recoveryCodeError = false;
        this.tokenService.setResetToken(this.RESET_TOKEN, this.RECOVERY_EMAIL);
        this.router.navigate(['/password-change']);
        this.recoveryCodeModal.close();
      },
      error => {
        this.modalProgressBar = false;
        this.recoveryCodeErrorMessage = error;
        this.recoveryCodeError = true;
      },
      () => {}
    );
  }


}


