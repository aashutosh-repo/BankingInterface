import { Component, inject, OnInit } from '@angular/core';
import { CustomerDetails } from '../../model/interfaces/customer.model';

import { FormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { CustomerOperationService } from '../../services/customer/customer-operation.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-homepage',
  imports: [FormsModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  constructor(private dialog : MatDialog){}

  customers: CustomerDetails[] = [];
  customerDetails = inject(CustomerOperationService);

  ngOnInit(): void {
    this.getCustomerDetails()
  }


  getCustomerDetails(){
    this.customerDetails.loadCustomerDetails().subscribe(data => {
      this.customers = data;
  });
}


}
