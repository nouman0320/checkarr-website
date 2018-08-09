import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { AccountService } from '../../../Services/account.service';
import { TokenService } from '../../../Services/token.service';

@Component({
  selector: 'app-redirect-recovery',
  templateUrl: './redirect-recovery.component.html',
  styleUrls: ['./redirect-recovery.component.css']
})
export class RedirectRecoveryComponent implements OnInit {

  private recoveryToken: String = null;
  private recoveryCode: String = null;
  private recoveryEmail: String = null;

  displayMessage: String = 'Processing your request...';

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private accountService: AccountService, private tokenService: TokenService) {

    this.recoveryToken = this.activatedRoute.snapshot.params['recoveryToken'];
    this.recoveryCode = this.activatedRoute.snapshot.params['recoveryCode'];
    this.recoveryEmail = this.activatedRoute.snapshot.params['recoveryEmail'];

    console.log(this.recoveryToken + '\n' + this.recoveryEmail + '\n' + this.recoveryCode);
    this.verifyRecoveryCode(this.recoveryCode);
  }

  ngOnInit() {
  }

  private RESET_TOKEN: String;
  verifyRecoveryCode(recoveryCode: String) {

    this.accountService.recoveryConfirmation(recoveryCode, this.recoveryToken, this.recoveryEmail)
    .subscribe(
      data => {
        // alert(data["RETURN_CODE"] +"\n"+data["RESET_TOKEN"]);
        const retCode = data['RETURN_CODE'];
        const resetToken = data['RESET_TOKEN'];

        if (retCode === 1) {
          // recovery code is confirmed

          this.RESET_TOKEN = resetToken;
          this.tokenService.setResetToken(this.RESET_TOKEN, this.recoveryEmail);
          this.displayMessage = 'redirecting...';
          this.router.navigate(['/password-change']);
        } else if (retCode === 2) {
          // recovery code is invalid
          this.displayMessage = 'Invalid request';

        } else if (retCode === 3) {
          // recovery token is invalid
          this.displayMessage = 'Invalid session';

        } else if (retCode === 4) {
          // exception in api
          this.displayMessage = 'Internal server error';

        } else if (retCode === 5) {
          // internal error
          this.displayMessage = 'Internal server error while processing your request';
        } else {
          // unknown
          this.displayMessage = 'Unknown error has occured';
        }

      }, error => {
        this.displayMessage = 'Uable to complete this request due to connection problem.';
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );

  }


}
