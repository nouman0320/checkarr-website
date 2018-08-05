import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state} from '@angular/animations'
import { AccountService } from '../../../../../Services/account.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({height: '*'})),
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate(250)
      ]),
      transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: 0}))
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
