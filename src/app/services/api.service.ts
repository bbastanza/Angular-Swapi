import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getPage(number: number): Observable<any[]> {
    const url = `${this.peopleUrl}number`;
    return this.httpClient.get<any[]>(url, options);
  }
}
