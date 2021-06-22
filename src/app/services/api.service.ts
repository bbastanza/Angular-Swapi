import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios, { AxiosResponse } from 'axios';
import { CharacterResults, Character } from 'src/assets/interfaces';

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
  constructor(private httpClient: HttpClient) {}

  async getPage(number: number): Promise<CharacterResults> {
    const url: string = `${this.peopleUrl}${number}`;
    const result: AxiosResponse = await axios.get(url);
    const characters: Character[] = await this.fetchAdditionalInfo(
      result?.data.results
    );

    return {
      characters: characters,
      count: result.data.count,
    };
  }

  private async fetchAdditionalInfo(
    characters: Character[]
  ): Promise<Character[]> {
    const homeworldPromises: Promise<string>[] = characters.map((character) =>
      axios.get(character.homeworld)
    );
    const speciesPromises: Promise<string>[] = [];
    for (const character of characters) {
      if (character.species.length > 0)
        speciesPromises.push(axios.get(character.species[0]));
    }

    const specieses: any[] = await Promise.all(speciesPromises);
    const homeworlds: any[] = await Promise.all(homeworldPromises);

    let spiciesIdx: number = 0;

    for (let i = 0; i < characters.length; i++) {
      characters[i].homeworldName = homeworlds[i].data.name;

      if (characters[i].species.length > 0) {
        characters[i].speciesName = specieses[spiciesIdx].data.name;
        spiciesIdx++;
        continue;
      }
      characters[i].speciesName = 'Human';
    }

    return characters;
  }
}
