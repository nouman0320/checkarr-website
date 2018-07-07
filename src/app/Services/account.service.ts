import { Injectable } from '@angular/core';
import { WebService } from './web.service';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class AccountService {


  loginStatus: Boolean = false;
  
  constructor(private webService: WebService) {}


 


  registerUser(Fullname: String, Email: String, Password: String, Gender: String){
    return this.webService.registerUser({Fullname: Fullname, Email: Email, Password: Password, Gender: Gender});
  }

  loginUser(Email: string, Password: string): Observable<any> {
    return this.webService.loginUser({Email: Email, Password: Password});
  }

  recoverAccount(recoveryEmail: String){
    var jsonStr = {
      "RECOVERY_EMAIL": recoveryEmail
    }
    return this.webService.recoverAccount(jsonStr);
  }

  



}
