import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-modify-account',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './create-modify-account.component.html',
  styleUrls: ['./create-modify-account.component.css']
})
export class CreateModifyAccountComponent implements OnInit {
  route = inject(ActivatedRoute );
  accountForm: FormGroup;
  mode: 'create' | 'edit' = 'create'; // Mode toggling

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      account_status: [0],
      account_number: [''], // Hidden in 'create' mode
      accType: ['1'],
      account_open_dt: [''],
      currency: [''],
      cust_id: [0],
      cus_type: [0],
      npa_status: [0],
      min_bal: [0], // Hidden in 'create' mode
      last_withdrawal_dt: [''],
      available_balance: [0],
      owner_name: [''],
      atm_req_flag: [0],
      cheq_req_flag: [0],
      sms_req_flag: [0],
      clsr_dt: [''],
      clsr_reason: ['']
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] === 'edit' ? 'edit' : 'create';
    });
  }
  accountTypes = [
    { value: 1, label: 'Saving' },
    { value: 2, label: 'Current' }
  ];

  onSubmit() {

    console.log(`${this.mode === 'create' ? 'Creating' : 'Updating'} Account:`, this.accountForm.value);
    alert(`Account successfully ${this.mode === 'create' ? 'created' : 'updated'}!`);
  }

  switchMode(newMode: 'create' | 'edit') {
    this.mode = newMode;
    if (newMode === 'edit') {
      this.accountForm.patchValue({
        account_number: 'ACC123456',
        min_bal: 5000
      });
    } else {
      this.accountForm.patchValue({
        account_number: '',
        min_bal: 0
      });
    }
  }

}
