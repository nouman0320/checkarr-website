import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { MediaService } from '../../Services/media.service';
import { AlertifyService } from '../../Services/alertify.service';

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

  registered: Boolean = false;

  constructor(
    public router: Router,
    public accountService: AccountService,
    private mediaService: MediaService,
    private alertifyService: AlertifyService
  ) {
    if (this.accountService.loginStatus == true) {
      this.router.navigate(['']);
    } else {
      this.accountService.authorize('register');
    }
  }

  ngOnInit() {}

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
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
        console.log('Register is successful');
        this.alertifyService.success('Great! Just few more steps');
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
        this.registerTry = false;
      }
    );
  }

  on_dp_select() {
    this.mediaService.upload_dp(this.croppedImage);
  }
}
