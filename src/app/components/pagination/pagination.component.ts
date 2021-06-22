import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Output() onSelected: EventEmitter<number> = new EventEmitter();
  pages: number[] = [];
  currentPage: number = 1;

  constructor() {
    for (let i = 1; i <= 9; i++) {
      this.pages.push(i);
    }
  }

  handleClick(number: number) {
    this.currentPage = number;
    this.onSelected.emit(this.currentPage);
  }

  ngOnInit(): void {}
}
