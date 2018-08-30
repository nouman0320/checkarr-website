import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { MediaService } from '../../Services/media.service';
import { AlertifyService } from '../../Services/alertify.service';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerGender: String = 'male';
  registerError: Boolean = false;
  registerErrorMessage: String = '';
  connectionError: Boolean = false;

  registerTry: Boolean = false;

  registered: Boolean = false; // this should be false


  imageError: Boolean = false;
  imageDirty: Boolean = false;

  RegisterMessage: String = "Setting up your account...";

  constructor(
    public router: Router,
    public accountService: AccountService,
    private mediaService: MediaService,
    private alertifyService: AlertifyService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {}

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageDirty = true;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
    this.imageError = false;
  }
  loadImageFailed() {
    // show message
    this.imageError = true;
  }

  onClickLogin() {
    this.router.navigate(['/welcome']);
  }

  onRegisterTry(registerForm: NgForm) {
    this.registerTry = true;

    const Fullname: String = registerForm.value.fullname;
    const Email: String = registerForm.value.email;
    const Password: String = registerForm.value.password;
    const Sex: String = this.registerGender;

    console.log('register method called');
    this.accountService.registerUser(Fullname, Email, Password, Sex).subscribe(
      data => {
        this.RegisterMessage = "Almost there..";
        console.log('Register is successful');
        this.alertifyService.success('Great! Just few more steps');
        this.accountService.loginUser(registerForm.value.email, registerForm.value.password).subscribe(
          data => {
            this.registerTry = false;
            this.registered = true;
            const user = data;

            const activation_status = user.activation_status;
            const user_email = user.user_email;
            const access_token = user.token;
            const refresh_token = user.refresh_token;
            const user_id = user.user_id;
            //this.alertifyService.success('Welcome');
            //this.router.navigate(['']);
            console.log('login success');
            console.log(user_email);
            console.log(access_token);
            console.log(refresh_token);
            console.log(user_id);
            if (activation_status == 'T') {
              this.accountService.isUserAccountActivated = true;
            } else {
              this.accountService.isUserAccountActivated = false;
            }
            this.accountService.USER_EMAIL = user_email;
            this.accountService.USER_ID = user_id;
            this.tokenService.setAccessToken(access_token, user_id);
            this.tokenService.setRefreshToken(refresh_token, user_id);
          }
          ,err => {
            this.router.navigate(['']);
          }
        );
      },
      error => {
        // console.log(error);
        // this.registerErrorMessage = error;
        // this.registerError = true;

        this.alertifyService.error(error);
        this.registerTry = false;
      },
      () => {
        this.registerError = false;
        
      }
    );
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
    type: 'image/jpg'
    });
  }

  on_dp_select() {


    var myFile:Blob=this.dataURItoBlob(this.croppedImage);
    var file = new File([myFile], 'File.jpeg', {type: "'image/jpeg"});
    //console.error(myFile);
    this.mediaService.upload_dp(file);
  }
}



