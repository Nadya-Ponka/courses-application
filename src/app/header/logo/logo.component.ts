import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  public title = 'Video course';
  constructor() {}

  ngOnInit() {}

}
