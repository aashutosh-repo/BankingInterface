import { Component, inject, OnInit } from '@angular/core';
import { CustomerDetails } from '../../model/interfaces/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { CustomerOperationService } from '../../services/customer/customer-operation.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  constructor(private dialog : MatDialog){}
  ngOnInit(): void {
    this.dialog.open(LoginComponent, {
      disableClose: true,
      width: '400px',
      height: '600px'
    });
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
