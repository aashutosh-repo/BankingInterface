import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../../model/interfaces/account.model';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountURL = 'http://localhost:8080/account/viewAccounts';
  private accountModifyURL = 'http://localhost:8080/account';
  constructor(private http : HttpClient) { }
  accounts: Account[] =[];
  accountDetail! : Account;
  
    loadAccountsDetails(){
      return this.http.get<Account[]>(this.accountURL).pipe(catchError(this.handleException) );
    }


    getAccountById(accountId: string): Account {
      // return this.http.get<Account>(`${this.accountURL}/${accountId}`);
      if (accountId) {
        this.loadAccountsDetails().subscribe(
          (accounts: Account[]) => {
            this.accounts = accounts;}
        );
        // return this.accounts.find(acc => acc.account_number === accountId);

      }
      const account = this.accounts.find(acc => acc.account_number === accountId);

      if(account){
        this.accountDetail =account;
        return this.accountDetail;
      }else {
        console.log('Account not found');
        // Handle case when account is not found, e.g., show a message to the user
      }
      return this.accountDetail;
    }


    saveAccount(accountData: any, mobileNum: string): Observable<Account> {
      //create headers 
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post<Account>(`${this.accountModifyURL}/create?MobileNum=${mobileNum}`, accountData, {headers})
      .pipe(catchError(this.handleException));
    };


    private handleException(error: any): Observable<never> {
      throw new Error('Method not Executed properly .' + error);
    }
}
