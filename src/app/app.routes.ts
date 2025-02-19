import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EmiCalculatorComponent } from './pages/emi-calculator/emi-calculator.component';
import { TilesComponent } from './pages/tiles/tiles.component';
import { ShowAccountsComponent } from './pages/accounts/show-accounts/show-accounts.component';
import { AccountDetailsComponent } from './pages/accounts/account-details/account-details.component';

export const routes: Routes = [
    {path : '', component: LoginComponent},
    {path : 'homepage' , component: HomepageComponent},
    {path : 'login' , component: LoginComponent},
    {path : 'emi', component: EmiCalculatorComponent},
    {path : 'main', component: TilesComponent},
    {path : 'allAccountsHome', component: ShowAccountsComponent},
    {path : 'accountDetails/:account_number', component: AccountDetailsComponent},
    { path: '', redirectTo: '/allAccountsHome', pathMatch: 'full' }
];
