import { Component, OnInit, Input } from '@angular/core';
import { Fan } from '../../../model/fan';

@Component({
  selector: 'app-fan-card',
  templateUrl: './fan-card.component.html',
  styleUrls: ['./fan-card.component.css']
})
export class FanCardComponent implements OnInit {

  @Input() fan: Fan;

  constructor() { }

  ngOnInit() {
  }

}
