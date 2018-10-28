import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../../Services/account.service';

@Component({
  selector: 'app-default-post',
  templateUrl: './default-post.component.html',
  styleUrls: ['./default-post.component.css']
})
export class DefaultPostComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

}
