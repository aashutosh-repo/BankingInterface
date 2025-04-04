import { Component, inject, OnInit } from '@angular/core';
import { CustomerDetails } from '../../model/interfaces/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { CustomerOperationService } from '../../services/customer/customer-operation.service';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  ngOnInit(): void {
    this.getCustomerDetails()
  }
  customers: CustomerDetails[] = [];

  customerDetails = inject(CustomerOperationService);

  getCustomerDetails(){
    this.customerDetails.loadCustomerDetails().subscribe(data => {
      this.customers = data;
  });
}


}
