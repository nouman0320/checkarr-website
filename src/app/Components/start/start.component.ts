import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { TokenService } from '../../Services/token.service';

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

  constructor(public router: Router, public accountService: AccountService, public tokenService: TokenService) { }

  ngOnInit() {

    
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
        
      },error => {
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
  }

  onLoginTry(loginForm: NgForm) {
    this.loginTry = true;
    
    this.connectionError = false;
    this.loginError = false;
    this.userNotFoundError = false;

    this.accountService.loginUser(loginForm.value.email, loginForm.value.password)
    .subscribe(
      data => {
        console.log(JSON.stringify(data))
        if(data["ok"] == 1 && data["issued"] == true){//login sucess
          alert("Login Successful");

          this.tokenService.setAccessToken(data["token"], loginForm.value.email);

        }
        else if(data["ok"] == 2){ // incorrect password
          this.loginError = true;
        }
        else if(data["ok"] == 3){ // account not found
          this.userNotFoundError = true;
          console.log("not found");
        }
        
        
      },error => {
        console.log("Unable to connect to the server");
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

  onClickRegister(){
    this.router.navigate(['/register']);
  }

}
