import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../Services/token.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../Services/account.service';


@Component({
  selector: 'app-recovery-password-change',
  templateUrl: './recovery-password-change.component.html',
  styleUrls: ['./recovery-password-change.component.css']
})
export class RecoveryPasswordChangeComponent implements OnInit {


  passwordChanged: Boolean = false;
  requestError: Boolean = false;

  progressbar: Boolean = false;

  noInternet: Boolean = false;
  pageLoading: Boolean = true;

  error: String = '';
  // pageLoading: Boolean = false;

  constructor(private tokenService: TokenService, private router: Router, private accountService: AccountService) {
    const isResetTokenExist = this.tokenService.doResetTokenExist();
    if (isResetTokenExist) {

      this.tokenService.verifyResetToken()
      .subscribe(
        data => {
          const reset_token_status = data['RESET_TOKEN_STATUS'];
        }, error => {
          this.noInternet = true;
          this.pageLoading = false;
        },
        () => {
          // 'onCompleted' callback.
          this.noInternet = false;
          this.pageLoading = false;
        }
      );

    } else { this.router.navigate(['']); }
  }

  ngOnInit() {
  }

  changePassword(newPassword: String) {
    this.requestError = false;
    this.progressbar = true;
    this.passwordChanged = false;
    this.error = '';

    if (this.tokenService.doResetTokenExist()) {
      const resetJson = this.tokenService.getResetTokenObject();
      if (resetJson != null) {
        const RESET_TOKEN = resetJson['RESET_TOKEN'];
        const RESET_EMAIL = resetJson['RESET_EMAIL'];

        // RESET_TOKEN = RESET_TOKEN + "1231";
      this.accountService.reset_change_password(RESET_TOKEN, RESET_EMAIL, newPassword)
      .subscribe(
        data => {
          // alert(data["RETURN_CODE"]);

          const RETURN_CODE = data['RETURN_CODE'];
          if (RETURN_CODE === 1) {
            // success
            this.requestError = false;
            this.passwordChanged = true;
            this.tokenService.removeResetToken();
          } else if (RETURN_CODE === 2) {
            // exception in controller
            this.requestError = true;
            this.error = 'Our servers encountered some internal error';
          } else if (RETURN_CODE === 3) {
            // reset token is not valid
            this.requestError = true;
            this.error = 'Please refresh the page';
          } else if (RETURN_CODE === 4) {
            // password not changed
            this.requestError = true;
            this.error = 'Unable to change password right now, try later.';
          } else if (RETURN_CODE === 5) {
            // New password is same as old password
            this.requestError = true;
            this.error = 'You have entered your current password';
          } else {
            this.requestError = true;
            this.error = 'Some unknown error has occured';
          }


          this.progressbar = false;


        }, error => {
          alert('ERROR');
          this.error = 'Unable to connect our services';
          this.requestError = true;
          this.progressbar = false;
        },
        () => {
          this.progressbar = false;
          // this.requestError = false;
        }
      );

      } else {
        // object is null
        this.cancel();
      }
    } else {
      // reset token does not exist
      this.cancel();
    }
  }

  cancel() {
    this.tokenService.removeResetToken();
    this.router.navigate(['']);

  }

}
