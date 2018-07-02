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

}
