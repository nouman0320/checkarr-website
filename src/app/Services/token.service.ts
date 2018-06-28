import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable()
export class TokenService {

  constructor(private webService: WebService) { }


  verifyAccessToken(){
    var localStorageObj = localStorage.getItem('currentUser');

    if(localStorageObj == null){
      // no user details present in browser
      return;
    }

    var currentUser = JSON.parse(localStorageObj);
    var token = currentUser.AccessToken;
    var email = currentUser.Email;
    var isValid = false;
    console.log(token);
    var jsonStr = {
      "AccessToken": token,
      "Email": email
    }
    this.webService.isTokenValid(jsonStr)
    .subscribe(
      data => {
        isValid = data["AccessValidation"]; 
        console.log("TOKEN SERVICE => isValid: "+isValid);
        // success connection
        
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
