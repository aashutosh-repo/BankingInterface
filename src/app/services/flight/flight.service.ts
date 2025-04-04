import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private apiUrl = 'YOUR_API_ENDPOINT'; // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  searchFlights(searchParams: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/flights`, { params: searchParams });
  }

  getDestinations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/destinations`);
  }
}
