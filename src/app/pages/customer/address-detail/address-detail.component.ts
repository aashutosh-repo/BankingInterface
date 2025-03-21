import { Component } from '@angular/core';
import { CustomerAddress } from '../../../model/interfaces/customerAddress.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-detail',
  imports: [FormsModule, CommonModule],
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

  nextStep() {
    // Save data to session storage
    sessionStorage.setItem('customerAddress', JSON.stringify(this.customerAddressTest));
    console.log(this.customerAddress);
    this.router.navigate(['/customer/nominee']);
  }


}
