import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ACCOUNT_LABEL_MAPPING } from '../../../constants/levels/account-label';
import { Account } from '../../../model/interfaces/account.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    MatGridListModule,
    MatSelectModule ,
    MatOptionModule],
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit{
  accountDetails: Account ={} as Account;
  accountForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.accountDetails = {
      accountId: 12345,
      internalAcntNumber: 'INT-45678',
      account_status: 1,
      account_number: 'ACC-987654',
      account_open_dt: '2022-05-10',
      currency: 'USD',
      cust_id: 1001,
      cus_type: 2,
      npa_status: 0,
      min_bal: 5000,
      last_withdrawal_dt: '2024-02-20',
      available_balance: 12000,
      owner_name: 'John Doe',
      atm_req_flag: 1,
      cheq_req_flag: 0,
      sms_req_flag: 1,
      clsr_dt: '',
      clsr_reason: '',
    };
  }

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      account_number: ['', Validators.required],
      owner_name: ['', Validators.required],
      currency: [''],
      available_balance: [0, Validators.min(0)]
    });
  }
  saveAccount() {
    if (this.accountForm.valid) {
      console.log('Account Data:', this.accountForm.value);
      alert('Account Created Successfully!');
    }
  }


  resetForm() {
    this.accountForm.reset();
  }
  

accountLabelMapping = ACCOUNT_LABEL_MAPPING;
getAccountLabel(key: unknown): string {
  return this.accountLabelMapping[key as string] ?? key as string;
}

}
