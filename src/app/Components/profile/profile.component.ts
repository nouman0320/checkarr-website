import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private isFeedSelected: Boolean = false;
  private isFanSelected: Boolean = false;
  private isFollowingSelected: Boolean = false;

  constructor(private accountService: AccountService) {

    this.isFeedSelected = true;

   }

  ngOnInit() {
  }


  select_category(type: String){
    if(type == "feed" && this.isFeedSelected == false){
      this.isFeedSelected = !this.isFeedSelected;
      this.isFanSelected = false;
      this.isFollowingSelected = false;
    }
    else if(type == "fan" && this.isFanSelected == false){
      this.isFanSelected = !this.isFanSelected;
      this.isFeedSelected = false;
      this.isFollowingSelected = false;
    }
    else if(type == "following" && this.isFollowingSelected == false){
      this.isFollowingSelected = !this.isFollowingSelected;
      this.isFeedSelected = false;
      this.isFanSelected = false;
    }
  }
}
