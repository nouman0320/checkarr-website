import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { Fan } from '../../model/fan';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { forEach } from '@angular/router/src/utils/collection';
import { ProfileUser } from '../../Model/profile-user';

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
  private profileLoaded: Boolean = false;
  private currentProfileUser: ProfileUser;


  userFirstName: String = null;
  numUserString: String = null;
  fanButtonString: String = null;


  private userFans: Fan[] = [];
  



  constructor(public accountService: AccountService, private route: ActivatedRoute, private router: Router) {

    
    this.isFeedSelected = true;
   
   }

  ngOnInit() {

    
    this.targetUserID = this.route.snapshot.paramMap.get('userID');
    this.currentProfileUser = new ProfileUser();

    this.accountService.PROFILE_USER_ID.subscribe((value: String) => {
      
      console.log("targetUserID "+this.targetUserID + " | value: "+value);
      if(this.targetUserID == value){
        this.userSelf = true;
      } 

      

      console.log("id "+this.targetUserID);
      console.log("userSelf "+this.userSelf);
    });

    this.getProfileDetails();


    
    
  }

  getProfileDetails(){

    this.accountService.getProfileDetails(this.targetUserID).subscribe(
      data=>{
        console.log(data);

        

        this.currentProfileUser.userName = data.userFullname;
        this.currentProfileUser.userSex = data.userSex;
        this.currentProfileUser.joinDate = data.userReg;
        this.currentProfileUser.totalFans = data.total_fans;
        this.currentProfileUser.isYourFan = data.fan;
        this.currentProfileUser.isYourFollowing = data.following; 
        this.currentProfileUser.dp_url = data.displayPicture_url;


        if(this.currentProfileUser.totalFans == "0"){
          this.numUserString = "looking for some fans";
        }
        else if(this.currentProfileUser.totalFans == "1"){
          this.numUserString = "Getting popular among fans";
        }
        else{
          this.numUserString = "Getting popular among "+this.currentProfileUser.totalFans+" fans";
        }

        if(this.currentProfileUser.userSex == "F"){
          this.fanButtonString = "Fan of her";
        }
        else {
          this.fanButtonString = "Fan of him";
        }

        var nameSplit = this.currentProfileUser.userName.split(" ");
        this.userFirstName = nameSplit[0];

        console.log(this.currentProfileUser);
        this.profileLoaded = true;
      },
      err=>{  
        this.router.navigate([""]);
      },
      ()=>{
        
      }
    );

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

  becomeFan(){
    this.accountService.becomeFan(this.accountService.USER_ID, this.targetUserID).subscribe(
      success=>{
        this.currentProfileUser.isYourFollowing = true;
      },
      err=>{
        this.currentProfileUser.isYourFollowing = false;
      }
    );
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
