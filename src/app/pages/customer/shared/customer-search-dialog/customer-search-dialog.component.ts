import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerOperationService } from '../../../../services/customer/customer-operation.service';
import { CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from '../../../../constants/dropdowns/CommonDropDowns';
import { CustomerSearchRequestDto } from '../../../../model/interfaces/customer/customerRequestDTO.model';
import { CoreServicesService } from '../../../../services/core/core-services.service';
import { LabelMapperService } from '../../../../services/utility/label-mapper.service';
import { CustomerDto } from '../../../../model/interfaces/customerDTO.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-customer-search-dialog',
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
    MatOptionModule,
    MatIconModule,
    RouterModule, MatMenuModule, MatToolbarModule
  ],
  templateUrl: './customer-search-dialog.component.html',
  styleUrls: ['./customer-search-dialog.component.css'],
})
export class CustomerSearchDialogComponent {


  sortAttached = false;
  ngAfterViewChecked(): void {
    // Ensure the table is updated after view changes
    if (this.showTable && this.sort && !this.sortAttached) {
      this.dataSource.sort = this.sort;
      this.sortAttached = true; // Attach only once
    }
  }

  coreService = inject(CoreServicesService);
  private labelMapper = inject(LabelMapperService);
  
  dataSource = new MatTableDataSource<CustomerDto>([]);
  @ViewChild(MatSort,{ static: false }) sort!: MatSort;
  
  ngOnInit(): void {
    this.coreService.getHolidays().subscribe((dates: string[]) => {
      this.holidays = dates.map(date => new Date(date));
    });  
  }
  showTable = false;
  ngAfterViewInit() {
      this.dataSource.sort = this.sort;      
      this.showTable = this.dataSource.data.length > 0;

  }

  private customerService = inject(CustomerOperationService);
  constructor(
  ) {}
  

  todayDate: Date = new Date();
  holidays: Date[] = [];
  customerTypeOptions = CUSTOMER_TYPE_OPTIONS;
  customerStatusOptions = CUSTOMER_STATUS_OPTIONS;

  getStatusLabel(status: string |number): string {
    //use common label mapper service to get the label for the status
    return this.labelMapper.getLabel(this.customerStatusOptions, status);
  }

  getCategoryLabel(category: string |number): string {
    // const categoryStr = String(category);
    // const categoryStrOption = this.customerTypeOptions.find(opt => opt.value === categoryStr);
    // return categoryStrOption ? categoryStrOption.label : categoryStr;
    return this.labelMapper.getLabel(this.customerTypeOptions, category);
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

  // customers = signal<CustomerDto[]>([]);



  search() {
    this.customerSearchRequestDto.startDate = this.formatDate(this.startDate);
    this.customerSearchRequestDto.endDate = this.formatDate(this.endDate);
    console.log(this.customerSearchRequestDto);
    const requestPayload = JSON.stringify(this.customerSearchRequestDto);

    this.customerService
      .searchcustomerDetails(this.customerSearchRequestDto)
      .subscribe({
        // next: (data) => this.customers.set(data),
        next: (data) => {
          this.dataSource.data = data;
          this.showTable = data.length > 0;
          this.sortAttached = false; // Let AfterViewChecked reattach the sort
        },
        error: (err) => console.error('Error fetching customers:', err)
      });
  }
  // customers() {
  //   return this.dataSource;
  // }

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
}
}

