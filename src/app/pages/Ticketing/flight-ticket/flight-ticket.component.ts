import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightService } from '../../../services/flight/flight.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-flight-ticket',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatOptionModule, MatAutocompleteModule, MatToolbarModule, ReactiveFormsModule, MatNativeDateModule, MatInputModule],
  templateUrl: './flight-ticket.component.html',
  styleUrls: ['./flight-ticket.component.css']
})
export class FlightTicketComponent {

  searchForm: FormGroup;
  destinations: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService
  ) {
    this.searchForm = this.formBuilder.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [''],
      passengers: [1, Validators.required]
    });
  }

  ngOnInit() {
    this.loadDestinations();
  }

  loadDestinations() {
    this.flightService.getDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
      },
      error: (error) => {
        console.error('Error loading destinations:', error);
      }
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      this.flightService.searchFlights(this.searchForm.value).subscribe({
        next: (results) => {
          console.log('Flight search results:', results);
        },
        error: (error) => {
          console.error('Error searching flights:', error);
        }
      });
    }
  }

}
