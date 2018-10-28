import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Services/account.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit() {
  }

}
