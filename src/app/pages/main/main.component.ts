import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Character } from 'src/assets/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  pageCount: number = 0;
  searchTerm: string = '';
  characters: Character[] = [];
  loading: boolean = false;
  currentPage: number = 0;
  searchTimeout = setTimeout(() => {}, 1000);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPage(1);
  }

  handleChange(): void {
    this.characters = [];
    clearTimeout(this.searchTimeout);

    if (this.searchTerm !== '') {
      this.getSearchedCharacter();
      return;
    }

    const currentPage = this.currentPage;
    this.currentPage = 0;
    this.getPage(currentPage);
  }

  getSearchedCharacter() {
    this.loading = true;
    this.searchTimeout = setTimeout(async () => {
      this.characters = await this.apiService.searchForCharacter(
        this.searchTerm
      );
      this.loading = false;
    }, 1000);
  }

  async getPage(pageNumber: number): Promise<void> {
    this.searchTerm = '';
    if (this.currentPage === pageNumber) return;
    this.currentPage = pageNumber;
    this.loading = true;
    const { characters, count } = await this.apiService.getPage(pageNumber);
    if (this.searchTerm !== '') return;
    this.characters = characters;
    this.pageCount = count;
    this.loading = false;
  }
}
