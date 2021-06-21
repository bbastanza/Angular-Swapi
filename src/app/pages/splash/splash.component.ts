import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
})
export class SplashComponent implements OnInit {
  r2d2Img: string = 'assets/img/r2d2.png';

  constructor() {}

  ngOnInit(): void {}
}
