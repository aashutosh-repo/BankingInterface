import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EmiCalculatorComponent } from './pages/emi-calculator/emi-calculator.component';
import { TilesComponent } from './pages/tiles/tiles.component';
import { ShowAccountsComponent } from './pages/accounts/show-accounts/show-accounts.component';
import { AccountDetailsComponent } from './pages/accounts/account-details/account-details.component';
import { CreateModifyAccountComponent } from './pages/accounts/create-modify-account/create-modify-account.component';
import { PaymentProcesingComponent } from './pages/payments/payment-procesing/payment-procesing.component';
import { TestComponent } from './pages/test/test.component';
import { CustomerDetailsViewComponent } from './pages/customer/customer-details-view/customer-details-view.component';
import { PreviewCustomerDetailsComponent } from './pages/customer/preview-customer-details/preview-customer-details.component';
import { AccountManagementComponent } from './pages/account/account-management/account-management.component';
import { AccountViewComponent } from './pages/account/account-view/account-view.component';
import { FlightTicketComponent } from './pages/Ticketing/flight-ticket/flight-ticket.component';
import { FlightSearchResultComponent } from './pages/Ticketing/flight-search-result/flight-search-result.component';
import { CustomerSearchComponent } from './pages/customer/customer-search/customer-search.component';
import { accountRoutes } from './routes/account.routes';
import { customerRoutes } from './routes/customer.routes';
import { paymentRoutes } from './routes/payment.routes';
import { toolsRoutes } from './routes/tools.routes';

export const routes: Routes = [
    {path : '', component: LoginComponent},
    {path : 'login' , component: LoginComponent},
    {path : 'homepage' , component: HomepageComponent},
    {path : 'main', component: TilesComponent},
    { path: '', redirectTo: '/allAccountsHome', pathMatch: 'full' },
    { path: 'ticket', component: FlightTicketComponent },
    { path: 'flightresult', component: FlightSearchResultComponent },
    {path: 'test', component: TestComponent },
    ...accountRoutes,
    ...customerRoutes,
    ...paymentRoutes,
    ...toolsRoutes,
    {path : '**', redirectTo: '/login', pathMatch: 'full'},

];
