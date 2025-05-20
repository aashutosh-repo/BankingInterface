import { Component, Input } from '@angular/core';
import { Flight } from '../../../model/interfaces/flight.interface';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-flight-search-result',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatOptionModule, MatAutocompleteModule, MatToolbarModule, ReactiveFormsModule, MatNativeDateModule, MatInputModule],
  templateUrl: './flight-search-result.component.html',
  styleUrls: ['./flight-search-result.component.css']
})
export class FlightSearchResultComponent {
  @Input() selectedDate: string = '';
  // @Input() flights: Flight[] = [];


   flights: Flight[] = [
    {
      id: "FL123",
      departureTime: "08:30 AM",
      departureAirport: {
        code: "JFK",
        name: "John F. Kennedy International Airport",
        terminal: "4",
      },
      arrivalTime: "12:00 PM",
      arrivalAirport: {
        code: "LAX",
        name: "Los Angeles International Airport",
        terminal: "B",
      },
      duration: "5h 30m",
      stops: [],
      airlines: [{ name: "Delta Airlines", code: "DL" }],
      seatsLeft: 5,
      cabinClasses: [
        {
          type: "economy",
          name: "Main Cabin",
          price: { amount: 350, currency: "USD" },
          available: true,
        },
        {
          type: "premiumEconomy",
          name: "Comfort+",
          price: { amount: 600, currency: "USD" },
          available: true,
        },
        {
          type: "business",
          name: "Delta One",
          price: { amount: 1500, currency: "USD" },
          available: false,
        },
      ],
      nextDayArrival: false,
      aircraft: "Boeing 777",
    },
    {
      id: "FL456",
      departureTime: "14:15 AM",
      departureAirport: {
        code: "LHR",
        name: "London Heathrow Airport",
        terminal: "3",
      },
      arrivalTime: "04:00 PM",
      arrivalAirport: {
        code: "SIN",
        name: "Singapore Changi Airport",
        terminal: "1",
      },
      duration: "12h 45m",
      stops: [
        {
          airport: "DXB",
          duration: "1h 30m",
        },
      ],
      airlines: [{ name: "Emirates", code: "EK" }],
      seatsLeft: 3,
      cabinClasses: [
        {
          type: "economy",
          name: "Economy Class",
          price: { amount: 900, currency: "GBP" },
          available: true,
        },
        {
          type: "business",
          name: "Business Class",
          price: { amount: 2500, currency: "GBP" },
          available: true,
        },
      ],
      nextDayArrival: true,
      aircraft: "Airbus A380",
    },
    {
      id: "FL789",
      departureTime: "21:00 PM",
      departureAirport: {
        code: "SYD",
        name: "Sydney Kingsford Smith Airport",
        terminal: "2",
      },
      arrivalTime: "06:30 AM",
      arrivalAirport: {
        code: "HND",
        name: "Tokyo Haneda Airport",
        terminal: "I",
      },
      duration: "9h 30m",
      stops: [],
      airlines: [{ name: "Qantas", code: "QF" }],
      seatsLeft: 7,
      cabinClasses: [
        {
          type: "economy",
          name: "Economy Class",
          price: { amount: 800, currency: "AUD" },
          available: true,
        },
        {
          type: "premiumEconomy",
          name: "Premium Economy",
          price: { amount: 1500, currency: "AUD" },
          available: true,
        },
        {
          type: "business",
          name: "Business Suite",
          price: { amount: 3500, currency: "AUD" },
          available: true,
          mixedCabin: false,
        },
      ],
      nextDayArrival: true,
      aircraft: "Boeing 787 Dreamliner",
    },
  ];
  
  

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  getStopsLabel(stops: number): string {
    if (stops === 0) return 'Direct';
    return `${stops} ${stops === 1 ? 'stop' : 'stops'}`;
  }

}
