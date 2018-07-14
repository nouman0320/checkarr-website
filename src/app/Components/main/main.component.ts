import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';
import {NgbModal, NgbDropdownConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../Services/account.service';


import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // for deployment testing should be false
  testing: Boolean = false;

  loggedIn: Boolean = false; //login status

  pageLoading: Boolean = true; // for page loading screen
  noInternet: Boolean = false;


  verificationModalProgressBar: Boolean = false;
  accountVerificationError: Boolean = false;
  accountVerificationErrorMessage: String = "Something went wrong";


  resendButtonText = "";
  resendActivationMailCountdown: number = 0;



  constructor(private router: Router, private accountService: AccountService, configDropdown: NgbDropdownConfig, private modalService: NgbModal, private tokenService:TokenService) {
    configDropdown.placement = "bottom-right";
    configDropdown.autoClose = false;
    
   }

  
  ngOnInit() {

    if(this.testing) this.pageLoading = false;
    
    var localStorageObj = localStorage.getItem('currentUser');
    if(localStorageObj == null){
      // no user details present in browser
      if(!this.testing){
        this.router.navigate(["/welcome"]);
        
      }
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

        this.accountService.setSessionDetails(data);

        console.log("TOKEN SERVICE => isValid: "+isAccessTokenValid);
        // success connection

        if(!isAccessTokenValid){
          // access token is not valid now we will send refresh token
          console.log("=> Access token is not valid sending refresh token... ");
          if(!this.testing){
            this.router.navigate(["/welcome"]);
          }
            
          
          
          
        }
        else{
          // access token is valid so we can continue operation
          this.pageLoading = false;
          
        }
        
      },error => {
        console.log("Error while validating token");

        
        this.pageLoading = false;
        if(!this.testing){
          this.noInternet = true;  
        }
        // error
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here

        
        
        
      }
    ); // END VERIFY ACCESS TOKEN
    

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

 accountVerificationResendEmailCountdown(){

    if(this.resendActivationMailCountdown > 0) return;
    //---- COUNT DOWN TIMER
    const interval = 1000;
    const duration = 120 * 1000;
    const stream$ = Observable.timer(0, interval)
      .finally(() => { 
        //console.log("All done!");
        this.resendActivationMailCountdown = null;

      })
      .takeUntil(Observable.timer(duration + interval))
      .map(value => duration - value * interval);
    stream$.subscribe(value => {
      this.resendActivationMailCountdown = value;
      if((value/1000) <= 0)
        this.resendButtonText = "Resend mail";
      else 
      this.resendButtonText = "Resend mail ("+this.resendActivationMailCountdown/1000+")";
    });
    // ----
  }

  logout(){
    console.log("Logout function called");
  }


  resendActivationMail(){
    this.accountVerificationResendEmailCountdown();
    this.sendActivationMail();
  }

  sendActivationMail(){
    this.accountVerificationError = false;
    this.accountVerificationErrorMessage = "";
    // this is helper function for account verification
    console.log("Sending activation mail");
    this.accountService.sendActivationMail().subscribe(
      data => {
        var RETURN_CODE = data["RETURN_CODE"];
        var ACTIVATION_TOKEN = data["ACTIVATION_TOKEN"];
        console.log("Received returned data from activation mail");
        //alert(RETURN_CODE+"\n"+ACTIVATION_TOKEN);
        if(RETURN_CODE == 1){
          this.tokenService.setActivationToken(ACTIVATION_TOKEN);
          // mail is sent
          this.accountVerificationError = false;

        }
        else if(RETURN_CODE == 2){
          // exception
          this.accountVerificationErrorMessage = "Our servers encountered some internal error";
          this.accountVerificationError = true;
        }
        else{
          this.accountVerificationErrorMessage = "Something went wrong. Try again later.";
          this.accountVerificationError = true;
        }


      },error => {
        
        this.accountVerificationErrorMessage = "Unable to make connection";
        this.accountVerificationError = true;
        // error
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    ); 
  }
  

  private accountVerificationModal: NgbModalRef;
  accountVerificationClick(currentModal){
    console.log("verification click");
    console.log("isUserAccountActivated = "+ this.accountService.isUserAccountActivated);

    if(!this.accountService.isUserAccountActivated){
      // account is not activated
      this.accountVerificationResendEmailCountdown();
      this.accountVerificationError = false;
      this.accountVerificationErrorMessage = "Something went wrong";
      this.accountVerificationModal = this.modalService.open(currentModal, { centered: true });
      if(this.tokenService.doActivationTokenExist()){
        // activation token exist in local storage
        console.log('activation token exist');
      }
      else{
        console.log('activation token not exist');
        // activation token does not exist  
        this.sendActivationMail();
      }
    }
   
  }


  verifyActivationCode(activationCode: String){
    
    console.log("called");
    this.verificationModalProgressBar = true

    var activationJson = this.tokenService.getActivationTokenObject();
    if(activationJson == null) return;
    
    this.accountService.activate_user_account(activationJson, activationCode).subscribe(
      data => {
        var RETURN_CODE = data["RETURN_CODE"];
        //alert(RETURN_CODE);
        if(RETURN_CODE == 1){
          // account is activated
          this.accountVerificationError = false;
          this.accountVerificationErrorMessage = "";
          this.accountService.isUserAccountActivated = true;
          this.accountVerificationModal.close();
        }
        else if(RETURN_CODE == 2){
          // token is not valid
          this.accountVerificationErrorMessage = "Code appears to be expired. Please resend mail.";
          this.accountVerificationError = true;
        }
        else if(RETURN_CODE == 3){
          // exception in api
          this.accountVerificationErrorMessage = "unexpected error has occured in the server";
          this.accountVerificationError = true;
        }
        else if(RETURN_CODE == 4){
          // wrong code
          this.accountVerificationErrorMessage = "code is either invalid or expired";
          this.accountVerificationError = true;
        }
        else{
          // unknown error
          this.accountVerificationErrorMessage = "unexpected response from the server";
          this.accountVerificationError = true;
        }
      },error => {
        //alert("ERROR");
        this.accountVerificationErrorMessage = "unable to connect the services";
          this.accountVerificationError = true;
          this.verificationModalProgressBar = false;
      },() =>{
        this.verificationModalProgressBar = false;
      }
    );
  }



}
