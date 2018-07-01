import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenService {

  constructor(private webService: WebService, private router: Router) { }


  verifyAccessToken(vaildDest: String, invalidDest: String, inverse:Boolean){
    var localStorageObj = localStorage.getItem('currentUser');

    if(localStorageObj == null){
      // no user details present in browser

      if(inverse) this.router.navigate([invalidDest]);
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
    this.webService.isTokenValid(jsonStr)
    .subscribe(
      data => {
        isAccessTokenValid = data["AccessValidation"]; 
        console.log("TOKEN SERVICE => isValid: "+isAccessTokenValid);
        // success connection

        if(!isAccessTokenValid){
          // access token is not valid now we will send refresh token
          console.log("=> Access token is not valid sending refresh token... ");
          
          
          if(inverse) this.router.navigate([invalidDest]);
          
        }
        else{
          // access token is valid so we can continue operation
          if(!inverse) this.router.navigate([invalidDest]);
          
        }
        
      },error => {
        console.log("Error while validating token");
        
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        
      }
    );
  }

  setAccessToken(newKey: String, email: String){
    localStorage.setItem('currentUser', JSON.stringify({AccessToken: newKey, Email: email}));
  }

  clearAllTokens(){
    localStorage.removeItem('currentUser');
  }

}
