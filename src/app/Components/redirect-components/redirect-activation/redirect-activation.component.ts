import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { AccountService } from '../../../Services/account.service';
import { TokenService } from '../../../Services/token.service';

@Component({
  selector: 'app-redirect-activation',
  templateUrl: './redirect-activation.component.html',
  styleUrls: ['./redirect-activation.component.css']
})
export class RedirectActivationComponent implements OnInit {


  private activationToken: String = null;
  private activationCode: String = null;
  private userId: String = null;

  displayMessage: String = "Processing your request...";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private accountService: AccountService, private tokenService: TokenService) { 
    this.activationToken = this.activatedRoute.snapshot.params['activationToken'];
    this.activationCode = this.activatedRoute.snapshot.params['activationCode'];
    this.userId = this.activatedRoute.snapshot.params['userId'];


    console.log(this.activationToken +"\n"+ this.activationCode +"\n"+ this.userId);

    this.verifyActivationCode();
  }

  ngOnInit() {
  }

  verifyActivationCode(){
    this.accountService.activate_user_account_with_link(this.userId, this.activationCode, this.activationToken).subscribe(
      data => {
        var RETURN_CODE = data["RETURN_CODE"];
        //alert(RETURN_CODE);
        if(RETURN_CODE == 1){
          // account is activated
          this.displayMessage = "redirecting...";
          this.accountService.isUserAccountActivated = true;
          this.router.navigate([""]);
        }
        else if(RETURN_CODE == 2){
          // token is not valid
          this.displayMessage = "Session is expired or invalid";
        }
        else if(RETURN_CODE == 3){
          // exception in api
          this.displayMessage = "unexpected error has occured in the server";
        }
        else if(RETURN_CODE == 4){
          // wrong code
          this.displayMessage = "Session is either invalid or expired";
        }
        else{
          // unknown error
          this.displayMessage = "unexpected response from the server";
        }
      },error => {
        //alert("ERROR");
        this.displayMessage = "unable to connect the services";
      },() =>{
      }
    );
  }

}
