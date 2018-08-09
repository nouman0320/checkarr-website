import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Services/account.service';


@Component({
  selector: 'app-right-main',
  templateUrl: './right-main.component.html',
  styleUrls: ['./right-main.component.css']
})
export class RightMainComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit() {
  }

  toggleCompose() {
    this.accountService.showComposePost = !this.accountService.showComposePost;
  }

}
