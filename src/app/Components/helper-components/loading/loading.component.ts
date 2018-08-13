import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Services/account.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit() {
  }

}
