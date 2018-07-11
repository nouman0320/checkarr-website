import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenService {

  constructor(private webService: WebService, private router: Router) { }


  verifyAccessToken(jsonStr: any){
    return this.webService.isTokenValid(jsonStr);
  }

  setAccessToken(newKey: String, email: String){
    localStorage.setItem('currentUser', JSON.stringify({AccessToken: newKey, Email: email}));
  }

  clearAllTokens(){
    localStorage.removeItem('currentUser');
  }


  setResetToken(newKey: String, email: String){
    localStorage.setItem('currentUserResetInfo', JSON.stringify({ResetToken: newKey, ResetEmail: email}));
  }

  doResetTokenExist(){
    var localStorageObj = localStorage.getItem('currentUserResetInfo');
    if(localStorageObj == null) return false;
    else return true;
  }
  
  removeResetToken(){
    localStorage.removeItem('currentUserResetInfo');
  }

  getResetTokenObject(){
    if(this.doResetTokenExist()){
      var localStorageObj = localStorage.getItem('currentUserResetInfo');
      if(localStorageObj != null)
      {
        var currentUserResetInfo = JSON.parse(localStorageObj);
        var jsonStr = {
          "RESET_TOKEN":currentUserResetInfo.ResetToken,
          "RESET_EMAIL":currentUserResetInfo.ResetEmail
        }
        return jsonStr;
      }
      else return null;
    }
    else return null;
  }

  verifyResetToken(){

    var localStorageObj = localStorage.getItem('currentUserResetInfo');
    if(localStorageObj != null)
    {
      var currentUserResetInfo = JSON.parse(localStorageObj);
      var jsonStr = {
        "RESET_TOKEN":currentUserResetInfo.ResetToken,
        "RESET_EMAIL":currentUserResetInfo.ResetEmail
      }
      return this.webService.verifyResetToken(jsonStr);
    }
  }

}
