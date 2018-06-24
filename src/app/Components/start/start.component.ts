import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  loginError: Boolean = false;
  connectionError: Boolean = false;
  loginTry: Boolean = false;

  constructor(public router: Router, public accountService: AccountService) { }

  ngOnInit() {
  }

  onLoginTry(loginForm: NgForm) {
    this.loginTry = true;
    this.accountService.loginUser(loginForm.value.email, loginForm.value.password)
    .subscribe(
      data => {
        //console.log(data)
        this.loginError = !data;
      },error => {
        console.log("Unable to connect to the server");
        this.connectionError = true;
        this.loginTry = false;
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.connectionError = false;
      }
    );
  }

  onClickRegister(){
    this.router.navigate(['/register']);
  }

}
