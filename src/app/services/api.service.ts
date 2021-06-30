import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import {
  CharacterResults,
  Character,
  AdditionalInfo,
} from 'src/assets/interfaces';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  peopleUrl: string = 'https://swapi.dev/api/people/?page=';
  searchUrl: string = 'https://swapi.dev/api/people/?search=';

  constructor(private httpClient: HttpClient) {}

  getPage(number: number): Observable<CharacterResults> {
    const url: string = `${this.peopleUrl}${number}`;
    return this.httpClient.get<CharacterResults>(url, options).pipe(
      tap(console.log),
      mergeMap(async (characterResults: CharacterResults) => {
        return {
          results: await this.fetchAdditionalInfo(characterResults.results),
          count: characterResults.count,
        };
      })
    );
  }

  searchForCharacter(searchTerm: string): Observable<Character[]> {
    const url: string = `${this.searchUrl}${searchTerm}`;
    return this.httpClient
      .get<CharacterResults>(url, options)
      .pipe(
        mergeMap(
          async (characterResults: CharacterResults) =>
            await this.fetchAdditionalInfo(characterResults.results)
        )
      );
  }

  private async fetchAdditionalInfo(
    characters: Character[]
  ): Promise<Character[]> {
    const speciesPromises: Promise<AdditionalInfo>[] = characters.reduce(
      (promises: Promise<AdditionalInfo>[], character: Character) =>
        !!character.species.length
          ? [...promises, axios.get(character.species[0])]
          : promises,
      []
    );

    const homeworldPromises: Promise<AdditionalInfo>[] = characters.map(
      (character) => axios.get(character.homeworld)
    );

    const [specieses, homeworlds]: AdditionalInfo[][] = await Promise.all([
      Promise.all(speciesPromises),
      Promise.all(homeworldPromises),
    ]);

    let spiciesIdx: number = 0;
    for (let i = 0; i < characters.length; i++) {
      characters[i].homeworldName = homeworlds[i].data.name;

      if (!!characters[i].species.length) {
        characters[i].speciesName = specieses[spiciesIdx].data.name;
        spiciesIdx++;
        continue;
      }
      characters[i].speciesName = 'Human';
    }

    return characters;
  }
}
