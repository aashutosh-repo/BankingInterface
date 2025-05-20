import { Routes } from '@angular/router';
import { ShowAccountsComponent } from '../pages/accounts/show-accounts/show-accounts.component';
import { AccountDetailsComponent } from '../pages/accounts/account-details/account-details.component';
import { CreateModifyAccountComponent } from '../pages/accounts/create-modify-account/create-modify-account.component';
import { AccountManagementComponent } from '../pages/account/account-management/account-management.component';
import { AccountViewComponent } from '../pages/account/account-view/account-view.component';
import { LayoutComponent } from '../shared/layout/layout/layout.component';

export const accountRoutes: Routes = [
  {
    path: 'account',
    component: LayoutComponent,
    children: [
  
      { path: 'allAccountsHome', component: ShowAccountsComponent },
      { path: 'accountDetails/:account_number', component: AccountDetailsComponent },
      { path: 'createModifyAccount', component: CreateModifyAccountComponent },
      { path: 'modifyAccount/:account_number', component: AccountManagementComponent },
      { path: 'createAccount', component: AccountManagementComponent },
      { path: 'testAccount', component: AccountViewComponent }
    ]
  }
];
