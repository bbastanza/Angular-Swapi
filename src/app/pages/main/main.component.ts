import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Character, CharacterResults } from 'src/assets/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  searchTerm: string = '';
  characters: Character[] = [];
  count: number = 0;

  ngOnInit(): void {
    this.getPage(1);
  }

  constructor(private apiService: ApiService) {}

  async getPage(number: number): Promise<void> {
    const { characters, count } = await this.apiService.getPage(number);
    this.characters = characters;
    this.count = count;
  }
}
