import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loggedIn: boolean = false; //login status



  constructor(private router: Router, private tokenService:TokenService) { }

  
  ngOnInit() {
    this.tokenService.verifyAccessToken();

  /*
    //to verify if user is logged in 
    this.loggedIn = this.verifyAuthentication();

    // routing to welcome component if user is not verified
    if(!this.loggedIn) this.router.navigate(['welcome'])
  */
  }


  /*
   // login verification function
  verifyAuthentication(){
    return false;
  }

  */

  logout(){
    console.log("Logout function called");
  }

  
 

}
