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
        data => {},
        error => {
          this.router.navigate(['']);
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

      this.accountService.reset_change_password(RESET_TOKEN, RESET_EMAIL, newPassword)
      .subscribe(
        data => {
          // alert(data["RETURN_CODE"]);
          this.requestError = false;
          this.passwordChanged = true;
          this.tokenService.removeResetToken();
          this.progressbar = false;
        }, error => {
          this.error = error;
          this.requestError = true;
          this.progressbar = false;
          this.passwordChanged = false;
        },
        () => {
          this.progressbar = false;
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
