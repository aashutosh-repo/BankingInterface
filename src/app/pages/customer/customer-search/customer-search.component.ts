import { AfterViewChecked, AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CustomerDto } from '../../../model/interfaces/customerDTO.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CustomerOperationService } from '../../../services/customer/customer-operation.service';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CUSTOMER_STATUS, CUSTOMER_TYPE_OPTIONS } from '../../../constants/dropdowns/CommonDropDowns';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CoreServicesService } from '../../../services/core/core-services.service';
import { CustomerSearchRequestDto } from '../../../model/interfaces/customer/customerRequestDTO.model';
import { CUSTOMER_STATUS_OPTIONS } from '../../../constants/dropdowns/customer-dropdowns.constants';
import { CUSTOMER_LABEL_MAPPING } from '../../../constants/levels/customer-details-labels';
import { LabelMapperService } from '../../../services/utility/label-mapper.service';
import { EncryptionService } from '../../../services/encryption/encryption.service';


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
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit, AfterViewChecked  {
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
    private encryptionService: EncryptionService
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
};


}
