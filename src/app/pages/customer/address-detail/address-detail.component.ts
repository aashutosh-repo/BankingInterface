import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerAddress } from '../../../model/interfaces/customerAddress.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-address-detail',
  standalone:true,
  imports: [FormsModule, CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent {

  customerAddress: CustomerAddress = {} as CustomerAddress;
  customerAddressTest: CustomerAddress =
  {
    "customerID": 1001,
    "addressType": 1,
    "addressLn1": "123, MG Road",
    "addressLn2": "Near Central Park",
    "city": "Mumbai",
    "village": "Borivali",
    "district": "Mumbai Suburban",
    "taluka": "Borivali West",
    "state": "Maharashtra",
    "pinCode": 400091,
    "lastUpdate": "2025-03-20T14:30:00Z",
    "dateOfCapture": "2024-05-15T10:00:00Z"
  }
  

  constructor(private router: Router) {}
  @Output() nextStepToDocDetail = new EventEmitter<void>(); // Event to notify parent


  nextStep() {
    // Save data to session storage
    sessionStorage.setItem('customerAddress', JSON.stringify(this.customerAddressTest));
    console.log(this.customerAddress);
    // this.router.navigate(['/customer/nominee']);
    this.nextStepToDocDetail.emit();
  }

}
