import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule,Location } from '@angular/common';
import { ACCOUNT_LABEL_MAPPING } from '../../../constants/levels/account-label';
import { Account } from '../../../model/interfaces/account.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { AccountService } from '../../../services/accounts/account.service';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../../../services/session/session-storage.service';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [FormsModule, CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule, 
    MatCardModule, 
    MatGridListModule,
    MatIconModule, 
    MatButtonModule, 
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatSelectModule ,
    MatOptionModule
    ],
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit{
  accountDetails: Account ={} as Account;
  // accountForm: FormGroup = new FormGroup({});
  isProcessing = false;
  mobileNumber: string = '';
  isEditMode = false;


  ngOnInit(): void {
    this.checkEditMode();
  }

  checkEditMode(): void {
    const accountId = this.route.snapshot.paramMap.get('account_number');
    if (accountId) {
      this.isEditMode = true;
      this.getAccountDetailsOnModify(accountId);
    } else {
      this.isEditMode = false;
      this.accountDetails = {} as Account; // Reset object for new account creation
    }
  }
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private accountService: AccountService,
    private location: Location,
    private sessionStorageService: SessionStorageService) {
  }
  saveAccount() {
    console.log(this.accountDetails)
    this.accountService.saveAccount(this.accountDetails, this.mobileNumber).subscribe(
      (response) => {
        console.log("Account saved successfully:", response);
        this.isProcessing = false;
        // Optionally redirect or show a success message
      },
      (error) => {
        console.error("Error saving account:", error);
        this.isProcessing = false;
        // Optionally show an error message
      }
    );
  }

  modifyAccount(account: Account): void {
    console.log("Modifying Account:", account);
    // Implement logic to open a form for editing
  }


  getAccountDetailsOnModify(accountId: string): void {
        const accounts: Account[] = this.sessionStorageService.getItem<Account[]>('accounts') || [];
        if (accounts.length > 0) {
          this.accountDetails = accounts.find(account => account.account_number === accountId) as Account;
        }
      console.log("Fetched Account Details:", this.accountDetails.accountId); // Debugging
      if (this.accountDetails) {
        this.accountDetails.account_status = Number(this.accountDetails.account_status);
        // Convert date arrays to proper date strings
        this.accountDetails.account_open_dt = this.formatDate(this.accountDetails.account_open_dt);
        this.accountDetails.clsr_dt = this.formatDate(this.accountDetails.clsr_dt);
        this.accountDetails.last_withdrawal_dt = this.formatDate(this.accountDetails.last_withdrawal_dt);
      } else {
        console.error('Account not found!');
      }
  }

  formatDate(date: number[] | string | null): string {
    if (!date) {
      return ""; // Return an empty string for null or undefined values
    }
    
    if (typeof date === "string") {
      return date; // If it's already a string, return it as is
    }
  
    if (Array.isArray(date) && date.length === 3) {
      const [year, month, day] = date;
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  
    return ""; // Fallback case
  }

  updateMinBalance(customerType: number) {
    this.accountDetails.min_bal = customerType === 1 ? 1000 : 2000;
  }

  holidays: string[] = [
    '2025-01-01', // New Year's Day
    '2025-08-15', // Independence Day
    '2025-10-02', // Gandhi Jayanti
    '2025-12-25',  // Christmas
    '2025-03-25'
  ];

  highlightHolidays: MatCalendarCellClassFunction<Date> = (date: Date): string => {
    const dateStr = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
    return this.holidays.includes(dateStr) ? 'holiday' : ''; // ✅ Return empty string instead of null
  };

  
  goBack(): void {
    this.location.back();
  }

  
  deleteAccount(account: Account): void {
    if (confirm("Are you sure you want to delete this account?")) {
      console.log("Deleting Account:", account);
      // Implement delete logic (call API to remove the account)
    }
  }


  resetForm() {
    // this.accountForm.reset();
  }
  

accountLabelMapping = ACCOUNT_LABEL_MAPPING;
getAccountLabel(key: unknown): string {
  return this.accountLabelMapping[key as string] ?? key as string;
}

}
