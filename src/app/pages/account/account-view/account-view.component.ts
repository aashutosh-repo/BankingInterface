import { Component, inject } from '@angular/core';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { Account } from '../../../model/interfaces/account.model';
import { AccountService } from '../../../services/accounts/account.service';
import { Router } from '@angular/router';
import { ACCOUNT_LABEL_MAPPING } from '../../../constants/levels/account-label';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-account-view',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, 
    MatIconModule,MatFormFieldModule,
    MatTableModule, MatCardModule
  ],
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent {

  constructor(private sessionStorageService: SessionStorageService){}

  accounts : Account[] =[];
  accountService = inject(AccountService);
  router = inject(Router);

  displayedColumns: string[] = [
    'account_number',
    'account_status',
    'account_open_dt',
    'currency',
    'cust_id',
    'owner_name',
    'available_balance',
    'actions' // For edit & delete buttons
  ];

  dataSource = new MatTableDataSource<Account>([]);


  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.loadAccountsDetails().subscribe(
      (data) => {this.accounts = data
      this.dataSource.data = data; 
      this.sessionStorageService.setItem('accounts', this.accounts);
    });
  }
  deleteAccount(account: Account): void {
    console.log('Delete:', account.account_number);
    // Implement delete functionality here
  }

  editAccount(account: Account): void {
    console.log('Edit:', account.account_number);
    // Implement edit functionality here
    this.router.navigate(['/modifyAccount', account.account_number], {
      queryParams: { 
        mode: 'edit', 
        accountId: account.accountId 
      }
    });
  }


  accountLabelMapping = ACCOUNT_LABEL_MAPPING;
  getAccountLabel(key: unknown): string {
    return this.accountLabelMapping[key as string] ?? key as string;
  }

}
