import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  use1 = true;
  test1 = 5;
  test2 = 2;
  constructor() { }

  ngOnInit() {
  }

}
