import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/assets/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() characters: Character[] = [];
  @Input() loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getGenderClass(gender: string) {
    return gender === 'male' || gender === 'female' ? 'text-4xl' : '';
  }

  getGenderSymbol(gender: string) {
    return gender === 'male' ? '♂️' : gender === 'female' ? '♀' : 'N/A';
  }
}
