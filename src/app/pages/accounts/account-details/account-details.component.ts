import { Component, OnInit } from '@angular/core';
import { Account } from '../../../model/interfaces/account.model';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/accounts/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { LoadingComponent } from '../../../shared/dialogs/loading/loading.component';


@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [FormsModule,CommonModule,LoadingComponent],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit{

  account!: Account;
  isProcessing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private location: Location,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.getAccountDetails();
  }

  // getAccountDetails(): void {
  //   const accountId = this.route.snapshot.paramMap.get('account_number');
  
  //   if (accountId) {
  //     // const accounts: Account[] = JSON.parse(sessionStorage.getItem('accounts') || '[]');
  //     const accounts: Account[] = this.sessionStorageService.getItem<Account[]>('accounts') || [];

  
  //     if (accounts.length > 0) {
  //       this.account = accounts.find(account => account.account_number === accountId) as Account;
  //     }
  //   }
  
  //   if (!this.account) {
  //     console.error('Account not found!');
  //   }
  // }

  getAccountDetails(): void {
    this.isProcessing = true;  // Show loading spinner

    setTimeout(() => {
      const accountId = this.route.snapshot.paramMap.get('account_number');

      if (accountId) {
        const accounts: Account[] = this.sessionStorageService.getItem<Account[]>('accounts') || [];
  
        if (accounts.length > 0) {
          this.account = accounts.find(account => account.account_number === accountId) as Account;
        }
      }

      if (!this.account) {
        console.error('Account not found!');
      }

      this.isProcessing = false;  // Hide loading spinner
    }, 1000); // Simulate API delay
  }
  goBack(): void {
    this.location.back();
  }

}
