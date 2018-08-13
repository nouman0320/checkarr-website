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

  displayMessage: String = 'Processing your request...';

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private accountService: AccountService, private tokenService: TokenService) {
    this.activationToken = this.activatedRoute.snapshot.params['activationToken'];
    this.activationCode = this.activatedRoute.snapshot.params['activationCode'];
    this.userId = this.activatedRoute.snapshot.params['userId'];


    console.log(this.activationToken + '\n' + this.activationCode + '\n' + this.userId);

    this.verifyActivationCode();
  }

  ngOnInit() {
  }

  verifyActivationCode() {
    this.accountService.activate_user_account_with_link(this.userId, this.activationCode, this.activationToken).subscribe(
      data => {
        this.displayMessage = 'redirecting...';
        this.accountService.isUserAccountActivated = true;
        this.tokenService.removeActivationToken();
        this.router.navigate(['']);
      }, error => {
        this.displayMessage = error;
      }, () => {
      }
    );
  }

}
