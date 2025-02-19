import { Component, inject, OnInit } from '@angular/core';
import { Account } from '../../../model/interfaces/account.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/accounts/account.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session/session-storage.service';

@Component({
  selector: 'app-show-accounts',
  imports: [FormsModule,CommonModule],
  templateUrl: './show-accounts.component.html',
  styleUrls: ['./show-accounts.component.css']
})
export class ShowAccountsComponent implements OnInit{
  accounts : Account[] =[];
  accountService = inject(AccountService);
  router = inject(Router);

  constructor(private sessionStorageService: SessionStorageService){}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.loadAccountsDetails().subscribe(
      (data) => {this.accounts = data
      console.log(data);

      // sessionStorage.setItem('accounts', JSON.stringify(this.accounts));
      this.sessionStorageService.setItem('accounts', this.accounts);

      // error: (error) => console.error('Error fetching accounts:', error)
    });
  }

  viewAccount(account: Account): void {
    console.log("Viewing Account:", account);
    sessionStorage.setItem('selectedAccount', JSON.stringify(account))
    this.router.navigate(['/accountDetails', account.account_number]);
  }
  
  modifyAccount(account: Account): void {
    console.log("Modifying Account:", account);
    // Implement logic to open a form for editing
  }
  
  deleteAccount(account: Account): void {
    if (confirm("Are you sure you want to delete this account?")) {
      console.log("Deleting Account:", account);
      // Implement delete logic (call API to remove the account)
    }
  }

}
