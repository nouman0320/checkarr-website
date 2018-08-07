import { Component, OnInit, ViewChild,ElementRef} from '@angular/core';
import { trigger, transition, animate, style, state} from '@angular/animations'
import { AccountService } from '../../../Services/account.service';

@Component({
  selector: 'app-middle-main',
  templateUrl: './middle-main.component.html',
  styleUrls: ['./middle-main.component.css'],
  animations: [
    trigger('expandCollapseDetails', [
      state('void', style({
          'height': '0px',
          'margin-bottom': '0px',
          'padding-top': '0px',
          overflow: 'hidden'
      })),
      //element being added into DOM.
      transition(':enter', [
          animate('500ms ease-in-out', style({
              'height': '*',
              'margin-bottom': '*',
              'padding-top': '*',
              overflow: 'hidden'
          }))
      ]),
      //element being removed from DOM.
      transition(':leave', [
          animate('500ms ease-in-out', style({
              'height': '0px',
              'margin-bottom': '0px',
              'padding-top': '0px',
              overflow: 'hidden'
          }))
      ])
  ]),

  trigger('topCatAnim', [

    state('enter',style({
      'margin-bottom': '0px',
      'padding-top': '25px',
      'height': '70px', 
       overflow: 'hidden'
    })),
    state('leave',style({
       'margin-bottom': '*',
       'padding-top': '*',
       'height': '*', 
      overflow: 'hidden'
    })),
    transition('enter => leave', animate('100ms ease-in')),
    transition('leave => enter', animate('100ms ease-out'))

  ])
  ]


})
export class MiddleMainComponent implements OnInit {

  catSelectOpen: Boolean = false;
  catSelectAnim: String = 'leave';
  moreLess: String = 'More ...';

  activeIndicatorAllStatus: Boolean = false;
  activeIndicatorFoodStatus: Boolean = false;
  activeIndicatorMusicStatus: Boolean = false;
  activeIndicatorHumourStatus: Boolean = false;
  activeIndicatorMovieStatus: Boolean = false;
  activeIndicatorDramaStatus: Boolean = false;
  activeIndicatorFashionStatus: Boolean = false;
  activeIndicatorVehicleStatus: Boolean = false;
  activeIndicatorPoliticsStatus: Boolean = false;
  activeIndicatorEducationStatus: Boolean = false;
  activeIndicatorAdventureStatus: Boolean = false;
  activeIndicatorOtherStatus: Boolean = false;
  
  @ViewChild('activeIndicatorAll') activeIndicatorAll: ElementRef;
  @ViewChild('activeIndicatorFood') activeIndicatorFood: ElementRef;
  @ViewChild('activeIndicatorMusic') activeIndicatorMusic: ElementRef;
  @ViewChild('activeIndicatorHumour') activeIndicatorHumour: ElementRef;
  @ViewChild('activeIndicatorMovie') activeIndicatorMovie: ElementRef;
  @ViewChild('activeIndicatorDrama') activeIndicatorDrama: ElementRef;
  @ViewChild('activeIndicatorFashion') activeIndicatorFashion: ElementRef;
  @ViewChild('activeIndicatorVehicle') activeIndicatorVehicle: ElementRef;
  @ViewChild('activeIndicatorPolitics') activeIndicatorPolitics: ElementRef;
  @ViewChild('activeIndicatorEducation') activeIndicatorEducation: ElementRef;
  @ViewChild('activeIndicatorAdventure') activeIndicatorAdventure: ElementRef;
  @ViewChild('activeIndicatorOther') activeIndicatorOther: ElementRef;

  statusActiveClass:String = "activeIndicatorDiv active";
  statusInactiveClass:String = "activeIndicatorDiv";


  constructor(private accountService: AccountService) {
    
   }

  ngOnInit() {
    
  }

  toggleCatSelect(){
    this.catSelectOpen = !this.catSelectOpen;
    if(this.catSelectOpen) {
      this.catSelectAnim = 'enter';
      this.moreLess = 'Less ...';
    }
    else{
      this.catSelectAnim = 'leave';
      this.moreLess = 'More ...';
    } 
  }

  turn_off_all_cats(){
    this.activeIndicatorAllStatus = false;
    this.activeIndicatorFoodStatus = false;
    this.activeIndicatorMusicStatus = false;
    this.activeIndicatorHumourStatus = false;
    this.activeIndicatorMovieStatus = false;
    this.activeIndicatorDramaStatus = false;
    this.activeIndicatorFashionStatus = false;
    this.activeIndicatorVehicleStatus = false;
    this.activeIndicatorPoliticsStatus = false;
    this.activeIndicatorEducationStatus = false;
    this.activeIndicatorAdventureStatus = false;
    this.activeIndicatorOtherStatus = false;
    
    this.activeIndicatorAll.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorFood.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorMusic.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorHumour.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorMovie.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorDrama.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorFashion.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorVehicle.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorPolitics.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorEducation.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorAdventure.nativeElement.className = this.statusInactiveClass;
    this.activeIndicatorOther.nativeElement.className = this.statusInactiveClass;
  }

  update_cat_status(){
    if(this.activeIndicatorAllStatus == true){
      this.turn_off_all_cats();
      this.activeIndicatorAll.nativeElement.className = this.statusActiveClass;
      this.activeIndicatorAllStatus = true;
    }
    else if(this.activeIndicatorAllStatus == false){
      this.activeIndicatorAll.nativeElement.className = this.statusInactiveClass;
      this.activeIndicatorAllStatus = false;

      if(this.activeIndicatorFoodStatus == true){
        this.activeIndicatorFood.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorFoodStatus == false){
        this.activeIndicatorFood.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorMusicStatus == true){
        this.activeIndicatorMusic.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorMusicStatus == false){
        this.activeIndicatorMusic.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorHumourStatus == true){
        this.activeIndicatorHumour.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorHumourStatus == false){
        this.activeIndicatorHumour.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorMovieStatus == true){
        this.activeIndicatorMovie.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorMovieStatus == false){
        this.activeIndicatorMovie.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorDramaStatus == true){
        this.activeIndicatorDrama.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorDramaStatus == false){
        this.activeIndicatorDrama.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorFashionStatus == true){
        this.activeIndicatorFashion.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorFashionStatus == false){
        this.activeIndicatorFashion.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorVehicleStatus == true){
        this.activeIndicatorVehicle.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorVehicleStatus == false){
        this.activeIndicatorVehicle.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorPoliticsStatus == true){
        this.activeIndicatorPolitics.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorPoliticsStatus == false){
        this.activeIndicatorPolitics.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorEducationStatus == true){
        this.activeIndicatorEducation.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorEducationStatus == false){
        this.activeIndicatorEducation.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorAdventureStatus == true){
        this.activeIndicatorAdventure.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorAdventureStatus == false){
        this.activeIndicatorAdventure.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      if(this.activeIndicatorOtherStatus == true){
        this.activeIndicatorOther.nativeElement.className = this.statusActiveClass;
      }
      else if(this.activeIndicatorOtherStatus == false){
        this.activeIndicatorOther.nativeElement.className = this.statusInactiveClass;
      }
      //=====
      

    }
  }

}
