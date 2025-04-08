import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerDto } from '../../../model/interfaces/customerDTO.model';
import { HttpClient } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { CustomerOperationService } from '../../../services/customer/customer-operation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CUSTOMER_STATUS, CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from '../../../constants/dropdowns/CommonDropDowns';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CoreServicesService } from '../../../services/core/core-services.service';
import { CustomerSearchRequestDto } from '../../../model/interfaces/customer/customerRequestDTO.model';


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
    MatSortModule,
    MatOptionModule
  ],
  
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.css'
})
export class CustomerSearchComponent implements OnInit{

  coreService = inject(CoreServicesService);
  ngOnInit(): void {
    this.coreService.getHolidays().subscribe((dates: string[]) => {
      this.holidays = dates.map(date => new Date(date));
    });  }

  private http = inject(HttpClient);
  private customerService = inject(CustomerOperationService);

  todayDate: Date = new Date();
  holidays: Date[] = [];
  customerTypeOptions = CUSTOMER_TYPE_OPTIONS;
  customerStatusOptions = CUSTOMER_STATUS_OPTIONS;

  getStatusLabel(status: string |number): string {
    const statusStr = String(status);
    const statusOption = this.customerStatusOptions.find(opt => opt.value === statusStr);
    return statusOption ? statusOption.label : statusStr;
  }

  getCategoryLabel(category: string |number): string {
    const categoryStr = String(category);
    const categoryStrOption = this.customerTypeOptions.find(opt => opt.value === categoryStr);
    return categoryStrOption ? categoryStrOption.label : categoryStr;
  }

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
  

  startDate: Date = new Date('');
  endDate: Date = new Date('');
  customerSearchRequestDto: CustomerSearchRequestDto= 
  {
    customerType: '',
    startDate: '',
    endDate: '',
    name: '',
    customerId: '',
    status: ''
  };

  customers = signal<CustomerDto[]>([]);



  search() {
    this.customerSearchRequestDto.startDate = this.formatDate(this.startDate);
    this.customerSearchRequestDto.endDate = this.formatDate(this.endDate);
    console.log(this.customerSearchRequestDto);
    this.customerService
      .searchcustomerDetails(this.customerSearchRequestDto)
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

  //for Holidays filter 


selectedDate!: Date;
today: Date = new Date();


dateClass = (d: Date): string => {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  return this.holidays.some(
    holiday =>
      holiday.getDate() === date.getDate() &&
      holiday.getMonth() === date.getMonth() &&
      holiday.getFullYear() === date.getFullYear()
  )
    ? 'holiday-date'
    : '';
};

holidayFilter = (date: Date | null): boolean => {
  if (!date) return false;

  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Return true if NOT a holiday (i.e., selectable), false if it IS a holiday
  return !this.holidays.some(
    holiday =>
      holiday.getDate() === d.getDate() &&
      holiday.getMonth() === d.getMonth() &&
      holiday.getFullYear() === d.getFullYear()
  );
};


}
