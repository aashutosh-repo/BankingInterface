import { Component, Inject } from '@angular/core';
import { CustomerDto } from '../../../model/interfaces/customerDTO.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-basic-details',
  imports: [FormsModule,CommonModule],
  templateUrl: './customer-basic-details.component.html',
  styleUrls: ['./customer-basic-details.component.css']
})
export class CustomerBasicDetailsComponent {

  customerDto: CustomerDto = {} as CustomerDto;
  constructor(private router: Router) {}

  nextStep() {
    // Save data to session storage
    sessionStorage.setItem('customerDto', JSON.stringify(this.customerDto));
    // console.log(this.customerDto)
    this.router.navigate(['/customer/document']);
  }

}
