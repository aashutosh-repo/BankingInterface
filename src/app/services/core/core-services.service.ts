import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreServicesService {

  holidaysURL: string = 'http://localhost:8080/core/v1/holidays/getHolidays'; // adjust URL as needed

  constructor(private http: HttpClient) {}

  getHolidays() {
    return this.http.get<string[]>(this.holidaysURL);
  }
}
