import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loggedIn: Boolean = false; //login status

  pageLoading: Boolean = true; // for page loading screen
  noInternet: Boolean = false;



  constructor(private router: Router, private tokenService:TokenService) { }

  
  ngOnInit() {
    
    var localStorageObj = localStorage.getItem('currentUser');
    if(localStorageObj == null){
      // no user details present in browser
      this.router.navigate(["/welcome"]);
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
          this.router.navigate(["/welcome"]);
        }
        else{
          // access token is valid so we can continue operation
          this.pageLoading = false;
          
        }
        
      },error => {
        console.log("Error while validating token");
        this.pageLoading = false;
        this.noInternet = true;
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

  logout(){
    console.log("Logout function called");
  }

  
 

}
