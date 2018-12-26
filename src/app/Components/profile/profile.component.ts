import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { Fan } from '../../model/fan';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private isFeedSelected: Boolean = false;
  private isFanSelected: Boolean = false;
  private isFollowingSelected: Boolean = false;
  private targetUserID: String = null;


  private userSelf: Boolean = false;
  private profileLoaded: Boolean = true;
  private userProfileImageUrl: String = null;
  private userName: String = null;
  private joinDate: String = null;


  private userFans: Fan[] = [];
  



  constructor(public accountService: AccountService, private route: ActivatedRoute) {

    
    this.isFeedSelected = true;
   
   }

  ngOnInit() {

    

    this.accountService.PROFILE_USER_ID.subscribe((value: String) => {
      this.targetUserID = this.route.snapshot.paramMap.get('userID');

      console.log("targetUserID "+this.targetUserID + " | value: "+value);
      if(this.targetUserID == value){
        this.userSelf = true;
      } 

      console.log("id "+this.targetUserID);
      console.log("userSelf "+this.userSelf);
    });


    
    
  }


  select_category(type: String){
    if(type == "feed" && this.isFeedSelected == false){
      this.isFeedSelected = !this.isFeedSelected;
      this.isFanSelected = false;
      this.isFollowingSelected = false;
      this.userFans = [];
    }
    else if(type == "fan" && this.isFanSelected == false){
      this.isFanSelected = !this.isFanSelected;
      this.isFeedSelected = false;
      this.isFollowingSelected = false;
      this.getUserFans();
    }
    else if(type == "following" && this.isFollowingSelected == false){
      this.isFollowingSelected = !this.isFollowingSelected;
      this.isFeedSelected = false;
      this.isFanSelected = false;
      this.userFans = [];
    }
  }

  getUserFans(){
    this.accountService.getUserFans(this.targetUserID).subscribe(
      data=>{
        //console.log(data);

        for(let i in data){
          console.log(data[i]);
          var temp = new Fan();
          temp.id = data[i].iduserLog;
          temp.fullName = data[i].userFullname;
          temp.creationTime = data[i].time;
          temp.photoURL = data[i].url;
          this.userFans.push(temp);
        }

        console.log(this.userFans);
      },
      err =>{
        console.log("error fetching fans");
      },
      ()=>{}
    );

  }


}
