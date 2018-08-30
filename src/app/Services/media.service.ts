import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { AccountService } from './account.service';
import { TokenService } from './token.service';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  uploading: Boolean = false;

  constructor(private webService: WebService, private accountService: AccountService,
     private tokenService: TokenService,
    private alertify: AlertifyService, private router: Router) { }


  upload_dp(image: any) {
    this.uploading = true;
    const formData = new FormData();
    formData.append('File', image);
    const localStorageObj = localStorage.getItem('currentUser');
    
    var token = "";
    if(localStorageObj != null)
    {
      const currentUser = JSON.parse(localStorageObj);
      token = currentUser.AccessToken;
    }

    //console.error(this.accountService.USER_ID);
    //console.error(token);

    this.webService.upload_dp(formData, this.accountService.USER_ID, token).subscribe(
      data => {
        console.log('SUCCES => DP');

        this.accountService.dp_url = data.url;
        console.log(this.accountService.dp_url);

        this.router.navigate(['']);
      }
      , err => {
        console.log(err);
        console.log('ERROR => DP');
        this.uploading = false;
        this.alertify.error('We are unable to add photo right now, try later');
        this.router.navigate(['']);
      },
      () => {
        this.uploading = false;
      }
    );
  }
}
