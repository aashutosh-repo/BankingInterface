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

  constructor(private router: Router) {}

  nextStep() {
    // Save data to session storage
    sessionStorage.setItem('customerAddress', JSON.stringify(this.customerAddress));
    console.log(this.customerAddress);
    this.router.navigate(['/customer-details/nominee-details']);
  }


}
