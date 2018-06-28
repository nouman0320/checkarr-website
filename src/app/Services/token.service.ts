import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable()
export class TokenService {

  constructor(private webService: WebService) { }


  verifyAccessToken(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.AccessToken;
    console.log(token);
    var jsonStr = {
      "AccessToken": token
    }
    this.webService.isTokenValid(jsonStr)
    .subscribe(
      data => {
        console.log("TOKEN SERVICE: "+data);
        
      },error => {

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

}
