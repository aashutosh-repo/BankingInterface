import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreServicesService {

  holidaysURL = 'http://localhost:8080/core/v1/holidays/getHolidays'; // adjust URL as needed
  private tokenizeUrl = 'http://localhost:8080/core/secureCard/tokenize';


  constructor(private http: HttpClient) {}

  getHolidays() {
    return this.http.get<string[]>(this.holidaysURL);
  }

  async tokenizeCard(cardNumber: string): Promise<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `cardNumber=${cardNumber}`;

    return await firstValueFrom(
      this.http.post(this.tokenizeUrl, body, { headers, responseType: 'text' })
    );
  }

}
