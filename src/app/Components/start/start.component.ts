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

  constructor(public router: Router, public accountService: AccountService, public tokenService: TokenService) { }

  ngOnInit() {
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
