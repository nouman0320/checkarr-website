import { Component, OnInit } from '@angular/core';
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

  constructor(private accountService: AccountService) { }

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

}
