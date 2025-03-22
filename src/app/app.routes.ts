import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EmiCalculatorComponent } from './pages/emi-calculator/emi-calculator.component';
import { TilesComponent } from './pages/tiles/tiles.component';
import { ShowAccountsComponent } from './pages/accounts/show-accounts/show-accounts.component';
import { AccountDetailsComponent } from './pages/accounts/account-details/account-details.component';
import { CreateModifyAccountComponent } from './pages/accounts/create-modify-account/create-modify-account.component';
import { CustomerBasicDetailsComponent } from './pages/customer/customer-basic-details/customer-basic-details.component';
import { DocumentsDetailComponent } from './pages/customer/documents-detail/documents-detail.component';
import { AddressDetailComponent } from './pages/customer/address-detail/address-detail.component';
import { NomineeDetailComponent } from './pages/customer/nominee-detail/nominee-detail.component';
import { PaymentProcesingComponent } from './pages/payments/payment-procesing/payment-procesing.component';
import { TestComponent } from './pages/test/test.component';
import { CustomerOnboardingComponent } from './pages/customer/customer-onboarding/customer-onboarding.component';
import { CustomerDetailsViewComponent } from './pages/customer/customer-details-view/customer-details-view.component';
import { PreviewCustomerDetailsComponent } from './pages/customer/preview-customer-details/preview-customer-details.component';

export const routes: Routes = [
    {path : '', component: LoginComponent},
    {path : 'homepage' , component: HomepageComponent},
    {path : 'login' , component: LoginComponent},
    // {path : '**', redirectTo: '/login', pathMatch: 'full'},
    {path : 'emi', component: EmiCalculatorComponent},
    {path : 'main', component: TilesComponent},
    {path : 'allAccountsHome', component: ShowAccountsComponent},
    {path : 'accountDetails/:account_number', component: AccountDetailsComponent},
    { path: '', redirectTo: '/allAccountsHome', pathMatch: 'full' },
    {path : 'createModifyAccount', component: CreateModifyAccountComponent},
    {path : 'customer/basicdetail', component: CustomerBasicDetailsComponent},
    {path : 'customer/document', component: DocumentsDetailComponent},
    {path : 'customer/address', component: AddressDetailComponent},
    {path : 'customer/nominee', component: NomineeDetailComponent},
    {path : 'customer/viewDetails', component: CustomerDetailsViewComponent},
    {path: 'payment', component: PaymentProcesingComponent},
    {path : 'customer/onboarding', component: CustomerDetailsViewComponent},
    {path: 'customer/submit', component: CustomerOnboardingComponent},
    {path: 'customer/preview', component: PreviewCustomerDetailsComponent},
    {path: 'test', component: TestComponent },
    {path : '**', redirectTo: '/login', pathMatch: 'full'}

];
