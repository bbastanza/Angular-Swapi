import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  searchTerm: string = '';

  logger() {
    console.log(this.searchTerm);
  }

  constructor() {}

  ngOnInit(): void {}
}
