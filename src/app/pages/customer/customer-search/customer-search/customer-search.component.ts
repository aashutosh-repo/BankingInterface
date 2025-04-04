import { Component, inject, signal } from '@angular/core';
import { CustomerDto } from '../../../../model/interfaces/customerDTO.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerOperationService } from '../../../../services/customer/customer-operation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CUSTOMER_TYPE_OPTIONS } from '../../../../constants/dropdowns/CommonDropDowns';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
  MatOptionModule],
  
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.css'
})
export class CustomerSearchComponent {

  private http = inject(HttpClient);
  private customerService = inject(CustomerOperationService);

  customerTypeOptions = CUSTOMER_TYPE_OPTIONS;

  displayedColumns: string[] = [
    'customerCategory',
    'firstName',
    'lastName',
    'fatherName',
    'motherName',
    'mail',
    'mobileNumber',
    'status'
  ];
  

  customerType = '2';
  startDate: Date = new Date('2024-08-01');
  endDate: Date = new Date('2024-08-15');
  customers = signal<CustomerDto[]>([]);

  search() {
    console.log('Customer Type:', this.customerType);
    console.log('Start Date:', this.formatDate(this.startDate));
    console.log('End Date:', this.formatDate(this.endDate));
    
    this.customerService
      .searchcustomerDetails(this.customerType, this.startDate, this.endDate)
      .subscribe({
        next: (data) => this.customers.set(data),
        error: (err) => console.error('Error fetching customers:', err)
      });
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // months are 0-based
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

}
