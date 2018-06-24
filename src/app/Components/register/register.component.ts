import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerGender: String = "male";
  registerError: Boolean = false;
  connectionError: Boolean = false;

  registerTry: Boolean = false;

  constructor(public router: Router, public accountService: AccountService) { }

  ngOnInit() {
  }

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

  onClickLogin(){
    this.router.navigate(['/welcome']);
  }

  onRegisterTry(registerForm: NgForm){
    console.log(registerForm.value);
    console.log(this.registerGender);
    this.registerTry = true;
    this.accountService.registerUser(registerForm.value.fullname, registerForm.value.email, 
      registerForm.value.password, this.registerGender).subscribe(
        data => {
          console.log(data)
          this.registerError = !data;
        },error => {
          console.log("Unable to connect to the server");
          this.connectionError = true;
          this.registerTry = false;
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
          this.connectionError = false;
        }
      );


  }

}