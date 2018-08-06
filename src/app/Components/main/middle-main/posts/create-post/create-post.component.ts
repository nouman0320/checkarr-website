import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state} from '@angular/animations'
import { AccountService } from '../../../../../Services/account.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  animations: [
    trigger('expandCollapseDetails', [
      state('void', style({
          'height': '0px',
          'margin-bottom': '0px',
          overflow: 'hidden'
      })),
      //element being added into DOM.
      transition(':enter', [
          animate('500ms ease-in-out', style({
              'height': '*',
              'margin-bottom': '*',
              overflow: 'hidden'
          }))
      ]),
      //element being removed from DOM.
      transition(':leave', [
          animate('500ms ease-in-out', style({
              'height': '0px',
              'margin-bottom': '0px',
              overflow: 'hidden'
          }))
      ])
  ])
  ]
})
export class CreatePostComponent implements OnInit {

  val: Boolean = false;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }


  

}
