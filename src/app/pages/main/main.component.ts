import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Character } from 'src/assets/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  pageCount: number = 0;
  searchTerm: string = '';
  characters: Character[] = [];
  loading: boolean = false;
  currentPage: number = 0;
  searchTimeout = setTimeout(() => {}, 1000);
  subscription!: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPage(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleChange(): void {
    this.characters = [];
    clearTimeout(this.searchTimeout);

    if (!!this.searchTerm) {
      this.getSearchedCharacter();
      return;
    }

    // to bypass currentPage check
    const currentPage = this.currentPage;
    this.currentPage = 0;

    this.getPage(currentPage);
  }

  getSearchedCharacter(): void {
    this.loading = true;
    this.searchTimeout = setTimeout(() => {
      const characters$ = this.apiService.searchForCharacter(this.searchTerm);
      this.subscription = characters$.subscribe(
        (characters) => {
          this.characters = this.sortCharacters(characters);
          this.loading = false;
        },
        console.log,
        () => this.subscription.unsubscribe
      );
    }, 800);
  }

  async getPage(pageNumber: number): Promise<void | boolean> {
    this.loading = true;
    this.searchTerm = '';
    if (this.currentPage === pageNumber) return (this.loading = false);
    this.currentPage = pageNumber;

    const characterResults$ = this.apiService.getPage(this.currentPage);

    this.subscription = characterResults$.subscribe(
      (characterResults) => {
        if (!!!this.pageCount) this.pageCount = characterResults.count;
        this.characters = this.sortCharacters(characterResults.results);
        if (!!this.searchTerm) return;
        this.loading = false;
        this.subscription.unsubscribe();
      },
      console.log,
      () => console.log('completed')
    );
  }

  sortCharacters(characters: Character[]): Character[] {
    return characters.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
}
