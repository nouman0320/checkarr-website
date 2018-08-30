import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';
import {NgbModal, NgbDropdownConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../Services/account.service';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import { AlertifyService } from '../../Services/alertify.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  // for deployment testing should be false
  testing: Boolean = false;

  loggedIn: Boolean = false; // login status

  pageLoading: Boolean = true; // for page loading screen
  noInternet: Boolean = false;


  verificationModalProgressBar: Boolean = false;
  accountVerificationError: Boolean = false;
  accountVerificationErrorMessage: String = 'Something went wrong';


  resendButtonText = '';
  resendActivationMailCountdown = 0;



  constructor(private router: Router, public accountService: AccountService, configDropdown: NgbDropdownConfig,
    private modalService: NgbModal, private tokenService: TokenService, private alertifyService: AlertifyService) {
    configDropdown.placement = 'bottom-right';
    configDropdown.autoClose = false;

    // this.router.navigate(['/welcome']); // remove


   }


  ngOnInit() {

    if (this.testing) {
      this.pageLoading = false;
      console.log('** RUNNING IN TESTING MODE');
    }


  /*
    //to verify if user is logged in
    this.loggedIn = this.verifyAuthentication();

    // routing to welcome component if user is not verified
    if(!this.loggedIn) this.router.navigate(['welcome'])
  */
  }


  /*
   // login verification function
  verifyAuthentication(){
    return false;
  }

  */

 accountVerificationResendEmailCountdown() {

    if (this.resendActivationMailCountdown > 0) { return; }
    // ---- COUNT DOWN TIMER
    const interval = 1000;
    const duration = 120 * 1000;
    const stream$ = Observable.timer(0, interval)
      .finally(() => {
        // console.log("All done!");
        this.resendButtonText = 'Resend mail';
        this.resendActivationMailCountdown = null;

      })
      .takeUntil(Observable.timer(duration + interval))
      .map(value => duration - value * interval);
    stream$.subscribe(value => {
      this.resendActivationMailCountdown = value;
      if ((value / 1000) <= 1) {
        this.resendButtonText = 'Resend mail';
      } else {
      this.resendButtonText = 'Resend mail (' + this.resendActivationMailCountdown / 1000 + ')';
      }
    });
    // ----
  }

  logout() {
    console.log('Logout function called');
    this.accountService.logout();
    this.router.navigate(['/welcome']);
    this.alertifyService.message('Bye! see you soon');
  }


  resendActivationMail() {
    this.accountVerificationResendEmailCountdown();
    this.sendActivationMail();
  }

  sendActivationMail() {
    this.accountVerificationError = false;
    this.accountVerificationErrorMessage = '';
    // this is helper function for account verification
    console.log('Sending activation mail');
    this.accountService.sendActivationMail().subscribe(
      data => {
        const activation_token = data.activation_token;
        console.log('Received returned data from activation mail');
        this.tokenService.setActivationToken(activation_token);
        this.accountVerificationError = false;

      }, error => {
        this.accountVerificationErrorMessage = error;
        this.accountVerificationError = true;
        // error
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  verificationModal: any = null;
  closeVerificationModal() {
    this.verificationModal.close();
  }


  private accountVerificationModal: NgbModalRef;
  accountVerificationClick(currentModal) {
    console.log('verification click');
    console.log('isUserAccountActivated = ' + this.accountService.isUserAccountActivated);

    if (!this.accountService.isUserAccountActivated) {
      // account is not activated
      this.accountVerificationResendEmailCountdown();
      this.accountVerificationError = false;
      this.accountVerificationErrorMessage = 'Something went wrong';
      this.verificationModal = currentModal;
      this.accountVerificationModal = this.modalService.open(currentModal, { centered: true });
      if (this.tokenService.doActivationTokenExist()) {
        // activation token exist in local storage
        console.log('activation token exist');
      } else {
        console.log('activation token not exist');
        // activation token does not exist
        this.sendActivationMail();
      }
    }

  }


  verifyActivationCode(activationCode: String) {

    this.verificationModalProgressBar = true;

    const activationJson = this.tokenService.getActivationTokenObject();
    if (activationJson == null) { return; }

    this.accountService.activate_user_account(activationJson, activationCode).subscribe(
      data => {
          this.accountVerificationError = false;
          this.accountVerificationErrorMessage = '';
          this.accountService.isUserAccountActivated = true;
          this.accountVerificationModal.close();
          this.tokenService.removeActivationToken();
          this.alertifyService.success('Your account has been verified');
      }, error => {
        // alert("ERROR");
          this.accountVerificationErrorMessage = error;
          this.accountVerificationError = true;
          this.verificationModalProgressBar = false;
      }, () => {
        this.verificationModalProgressBar = false;
      }
    );
  }



}
